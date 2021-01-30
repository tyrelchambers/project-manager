import React from "react";

const Status = ({ text, wrapperClass = "", textClass = "", icon = "" }) => {
  return (
    <p
      className={`pt-1 pb-1 pl-4 pr-4 font-bold w-fit rounded-full flex items-center ${wrapperClass} ${textClass}`}
      title="Visibility"
    >
      {icon}
      {text}
    </p>
  );
};

export default Status;
