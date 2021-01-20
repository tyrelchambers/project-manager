import React from "react";
import "./FormLabel.css";
const FormLabel = ({ name, text, forAttr }) => {
  return (
    <label htmlFor={name} className="form-label" for={forAttr}>
      {text}
    </label>
  );
};

export default FormLabel;
