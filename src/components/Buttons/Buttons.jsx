import React from "react";
import "./buttons.css";

export const MainButton = (props) => {
  return (
    <button
      className={`btn primary shadow-lg ${
        props.classes ? props.classes : "bg-pink-500"
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
