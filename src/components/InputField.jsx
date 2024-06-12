import React from 'react';

const InputField = ({ handleChange, value, title, name, type = "radio" }) => {
  if (type === 'number' || type === 'text') {
    return (
      <label className="sidebar-label-container">
        <input
          onChange={handleChange}
          type={type}
          name={name}
          className='auth-modal-input'
        />
      </label>
    )
  }
  return (
    <label className="sidebar-label-container w-fit">
      <input
        onChange={handleChange}
        type={type}
        value={value} // Set the value prop as the input value
        name={name}
      />
      {title}
    </label>
  );
};

export default InputField;
