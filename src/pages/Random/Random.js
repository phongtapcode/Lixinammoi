import React, { useEffect, useRef, useState } from "react";
import "../Random/random.css";
const color = [
  "#00FFFF",
  "#0000FF",
  "#ADD8E6",
  "#FFFF00",
  "#00FF00",
  "#808000",
  "#C0C0C0",
  "#FFC0CB",
];
const money = ["5k", "10k", "20k", "50k", "100k", "200k", "500k"];
const moneyDeg = [70, 0, 310, 260, 215, 180, 110];
function Random() {
  const [deg, setDeg] = useState(0);
  const multiDeg = useRef(10);
  const percentageMoney = useRef([]);
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!localStorage.getItem("percentageMoney")) {
      localStorage.setItem('percentageMoney', JSON.stringify({
        "5k": "30",
        "10k": "20",
        "20k": "10",
        "50k": "10",
        "100k": "10",
        "200k": "10",
        "500k": "10"
      }));
    }
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // Lấy thông tin từ local storage
    const data = localStorage.getItem("percentageMoney");
    if (data) {
      const datas = JSON.parse(data);
      let indexMoney = 0;
      for (let i in datas) {
        for (let j = 0; j < parseInt(datas[i]); j++) {
          percentageMoney.current.push(indexMoney);
        }
        indexMoney++;
      }
    } else {
      console.log("Không tìm thấy dữ liệu trong local storage.");
    }
    const drawCircle = () => {
      // Lấy kích thước của màn hình
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Tính toán kích thước canvas sao cho nó luôn vuông và không bị giãn ra khi thay đổi kích thước của màn hình
      const size = Math.min(screenWidth, screenHeight) * 0.8;
      canvas.width = size;
      canvas.height = size;

      // Tính toán tọa độ trung tâm của canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Vẽ hình tròn ở trung tâm canvas
      const radius = size / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "blue";
      ctx.fill();
      // Chia hình tròn thành 5 phần bằng nhau
      const sliceAngle = (2 * Math.PI) / 7;
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, i * sliceAngle, (i + 1) * sliceAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = color[i];
        ctx.fill();
        ctx.closePath();

        // Tính toán tọa độ để vẽ chữ
        const textAngle = (i + 0.5) * sliceAngle; // Góc trung tâm của mỗi phần
        const x = centerX + Math.cos(textAngle) * (radius * 0.7); // Xác định tọa độ x dựa trên góc và bán kính
        const y = centerY + Math.sin(textAngle) * (radius * 0.7); // Xác định tọa độ y dựa trên góc và bán kính

        // Xoay canvas
        ctx.save();
        ctx.translate(x, y); // Di chuyển gốc tọa độ đến vị trí cần xoay chữ
        ctx.rotate(Math.PI / 2); // Xoay canvas ngang (xoay ngược hướng của góc chữ)

        // Vẽ chữ
        ctx.fillStyle = "black";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(money[i], 0, 0); // Vẽ chữ tại vị trí (0, 0) sau khi canvas đã được di chuyển và xoay
        ctx.restore(); // Phục hồi trạng thái ban đầu của canvas
      }
      // Vẽ hình tròn mới chồng lên hình tròn cũ
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    };
    // Vẽ lại hình tròn khi kích thước của màn hình thay đổi
    window.addEventListener("resize", drawCircle);
    drawCircle();
    // Xóa event listener khi component unmount
    return () => window.removeEventListener("resize", drawCircle);
  }, []);

  const handleRandom = () => {
    const ramdomIndexMoney = Math.floor(Math.random() * 100);
    if (percentageMoney.current.length > 100) {
      percentageMoney.current.splice(-100);
      // Đảo lại dãy số ngẫu nhiên
      for (let i = percentageMoney.current.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [percentageMoney.current[i], percentageMoney.current[j]] = [
          percentageMoney.current[j],
          percentageMoney.current[i],
        ]; // Hoán đổi giá trị tại vị trí i và j
      }
    }
    console.log(money[percentageMoney.current[ramdomIndexMoney]]);
    setDeg(
      360 * multiDeg.current +
        moneyDeg[percentageMoney.current[ramdomIndexMoney]]
    );
    if (multiDeg.current >= 20) {
      multiDeg.current = 10;
    } else {
      multiDeg.current *= 2;
    }
  };

  return (
    <div className="random">
      <div className="random__wheel">
        <canvas ref={canvasRef} style={{ transform: `rotate(${deg}deg)` }} />
        <span className="random__wheel--icon">▼</span>
      </div>
      <div className="random__rotate">
        <button
          className={"random__rotate--button btn btn-success"}
          onClick={handleRandom}
        >
          Quay
        </button>
      </div>
    </div>
  );
}

export default Random;
