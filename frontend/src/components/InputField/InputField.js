import React from "react";

export default function InputFiled({
  name,
  type,
  placeholder,
  value,
  userType,
  handleChange,
}) {
  return (
    <input
      type={type}
      className="form-control"
      placeholder={placeholder}
      value={value}
      disabled={userType === "Student"}
      onChange={(event) => {
        handleChange(name, event.target.value);
      }}
    />
  );
}
