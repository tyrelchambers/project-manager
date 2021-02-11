import React from "react";
import "./Status.css";

const Status = ({
  text,
  wrapperClass = "",
  textClass = "",
  icon = "",
  onClick,
}) => {
  return (
    <div
      className={`p-2 status-wrapper font-bold w-fit rounded-lg flex items-center ${wrapperClass} ${textClass}`}
      title={text}
      onClick={onClick}
    >
      <div className="span">{icon}</div>
      <p className="status-text">{text}</p>
    </div>
  );
};

export default Status;
