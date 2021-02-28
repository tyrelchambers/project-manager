import React from "react";
import "./InputWrapper.css";

const InputWrapper = ({ icon, children }) => {
  return (
    <div className="flex items-center input-wrapper">
      <div className="h-full w-16 flex items-center justify-center bg-pink-500 text-white wrapper-icon">
        {icon}
      </div>
      {children}
    </div>
  );
};

export default InputWrapper;
