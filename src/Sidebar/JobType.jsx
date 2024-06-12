import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";


const JobType = ({ handleChange }) => {
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
        handleChange({ key: "type", operation: "__eq", value: values.join(",") });
    }, [values])

    return (
        <div>
            <h4 className="text-lg font-medium mb-2">Kiểu công việc</h4>
            <div>

                <InputField
                    handleChange={onChange}
                    value="PER_HOUR"
                    title="Theo giờ"
                    name="test2"
                    type="checkbox"
                />

                <InputField
                    handleChange={onChange}
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
