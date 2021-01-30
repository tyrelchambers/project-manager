import React from "react";

const Status = ({ text, wrapperClass = "", textClass = "", icon = "" }) => {
  return (
    <div
      className={`p-2 font-bold w-fit rounded-lg flex items-center ${wrapperClass} ${textClass}`}
      title={text}
    >
      <div className="span">{icon}</div>
      <p>{text}</p>
    </div>
  );
};

export default Status;
