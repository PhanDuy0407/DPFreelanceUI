import React from 'react';

const InputField = ({ handleChange, value, title, name, type = "radio" }) => {
  return (
    <label className="sidebar-label-container">
      <input
        onChange={handleChange}
        type={type}
        value={value} // Set the value prop as the input value
        name={name}
      />
      <span className="checkmark"></span>
      {title}
    </label>
  );
};

export default InputField;
