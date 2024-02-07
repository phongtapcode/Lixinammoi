import "./edit.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import PercentageInput from "../../components/PercentageInput";
const moneys = ["5k", "10k", "20k", "50k", "100k", "200k", "500k"];
function Edit() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Bạn có muốn về trang chủ?");
  const dataStorage = localStorage.getItem("percentageMoney");
  const timeStorage = localStorage.getItem("time");
  const timeRotate = JSON.parse(timeStorage);
  const datas = JSON.parse(dataStorage);
  const [time,setTime] = useState(timeRotate);
  const [values, setValues] = useState({
    "5k": datas["5k"],
    "10k": datas["10k"],
    "20k": datas["20k"],
    "50k": datas["50k"],
    "100k": datas["100k"],
    "200k": datas["200k"],
    "500k": datas["500k"],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showModal = () => {
    let sumPercent = 0;
    let checkValues = true;
    for (let i in values) {
      sumPercent += parseInt(values[i]);
      if(parseInt(values[i])<0)checkValues = false;
    }
    if (sumPercent === 100 && checkValues && parseInt(time)>=1) {
      localStorage.setItem("percentageMoney", JSON.stringify(values));
      localStorage.setItem("time", time);
      setOpen(true);
    } else {
      if(!checkValues){
        alert("Bạn không được để giá trị âm!!!");
      }else if(parseInt(time)<1){
        alert("Nhập thời gian lớn hơn 1");
      }else{
        alert("Vui lòng nhập tổng tỉ lệ bằng 100%");
      }
    }
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      // Chuyển hướng
      navigate("/");
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleChangeTime = (event)=>{
    const { name, value } = event.target;
    setTime(value);
  }
  return (
    <div className="edit">
      <h1>Chỉnh tỉ lệ quay(%)</h1>
      <form>
        {moneys.map((money) => {
          return (
            <PercentageInput
              label={money}
              name={money}
              value={values[money]}
              onChange={handleChange}
            />
          );
        })}
        <h1>Chỉnh time quay(giây)</h1>
        <PercentageInput
              name={"time"}
              value={time}
              onChange={handleChangeTime}
        />
        <Button
          type="primary"
          onClick={showModal}
          style={{ marginTop: "20px" }}
        >
          Cập nhật
        </Button>
        <Modal
          title="Cập nhật thành công"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </form>
    </div>
  );
}
export default Edit;
