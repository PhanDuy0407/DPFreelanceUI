import React from "react";
import Button from "./Button";
import InputField from "../components/InputField";


const JobType = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Kiểu công việc</h4>
      <div>

        <InputField
          handleChange={handleChange}
          value="PER_HOUR"
          title="Theo giờ"
          name="test2"
          type="checkbox"
        />

        <InputField
          handleChange={handleChange}
          value="PER_PRJ"
          title="Theo dự án"
          name="test2"
          type="checkbox"
        />
      </div>
    </div>
  );
};

export default JobType;
