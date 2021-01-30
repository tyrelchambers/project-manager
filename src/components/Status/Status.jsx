import React from "react";

const Status = ({ text, wrapperClass = "", textClass = "", icon = "" }) => {
  return (
    <p
      className={`p-2 font-bold w-fit rounded-lg flex items-center ${wrapperClass} ${textClass}`}
      title={text}
    >
      {icon}
      {text}
    </p>
  );
};

export default Status;
