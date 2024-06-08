// import { Input } from "postcss";
import React from "react";
import InputField from "../components/InputField";

const Category = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Lĩnh vực</h4>
      <div>
        <InputField
          handleChange={handleChange}
          value="97e5fa94-b8b1-44d0-bb68-42c34a59e9ed"
          title="Design"
          name="test"
          type="checkbox"
        />
        <InputField
          handleChange={handleChange}
          value="	af3314e1-7c44-4e62-9d04-d831605d419c"
          title="IT"
          name="test"
          type="checkbox"
        />
      </div>
    </div>
  );
};

export default Category;


