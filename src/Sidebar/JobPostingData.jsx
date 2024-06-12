import React from "react";
import InputField from "../components/InputField";

const JobPostingData = ({ handleChange }) => {
  const onChange = (event, operation) => {
    handleChange({ key: event.target.name, value: event.target.value, operation })
  }
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Giá tối thiểu</h4>
      <InputField
        name="min_price"
        type="number"
        handleChange={(event) => onChange(event, "__gt")}
      />

      <h4 className="text-lg font-medium mb-2">Giá tối đa</h4>
      <InputField
        name="max_price"
        type="number"
        handleChange={(event) => onChange(event, "__lt")}
      />
    </div>
  );
};

export default JobPostingData;



