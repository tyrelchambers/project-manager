import React from "react";
import "./FormLabel.css";
const FormLabel = ({ name, text }) => {
  return (
    <label htmlFor={name} className="form-label">
      {text}
    </label>
  );
};

export default FormLabel;
