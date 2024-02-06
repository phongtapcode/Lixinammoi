import React from 'react';

const PercentageInput = ({ label, name, value, onChange }) => {
  return (
    <div className="edit__percentage">
      <label>{label}</label>
      <input
        className={`edit__percentage--${name}`}
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default PercentageInput;
