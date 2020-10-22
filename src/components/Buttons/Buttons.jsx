import React from "react";
import "./buttons.css";

export const MainButton = (props) => {
  return (
    <button
      className={`btn primary shadow-lg ${
        props.className ? props.className : ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
