// import { Input } from "postcss";
import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";

const Category = ({ handleChange }) => {
    const [values, setValues] = useState([]);

    const onChange = (event) => {
        const selectedValue = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setValues([...values, selectedValue]);
        } else {
            setValues(values.filter((value) => value !== selectedValue));
        }
    };

    useEffect(() => {
        handleChange({ key: "category_id", operation: "__eq", value: values.join(",") });
    }, [values])

    return (
        <div>
            <h4 className="text-lg font-medium mb-2">Lĩnh vực</h4>
            <div>
                <InputField
                    handleChange={onChange}
                    value="97e5fa94-b8b1-44d0-bb68-42c34a59e9ed"
                    title="Design"
                    name="test"
                    type="checkbox"
                />
                <InputField
                    handleChange={onChange}
                    value="af3314e1-7c44-4e62-9d04-d831605d419c"
                    title="IT"
                    name="test"
                    type="checkbox"
                />
            </div>
        </div>
    );
};

export default Category;


