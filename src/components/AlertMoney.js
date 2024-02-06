import React from "react";
function AlertMoney({ classname, money, onClick }) {
  return (
    <div className={classname}>
      <p>{`Bạn được ${money} :))))`}</p>
      <button className="hidden" onClick={onClick}>
        Ẩn
      </button>
    </div>
  );
}
export default AlertMoney;
