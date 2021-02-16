import React from "react";
import "./buttons.css";

export const MainButton = (props) => {
  let base = "btn ";
  const deleteIcon = <i className="fas fa-trash mr-4"></i>;
  let variant;

  if (props.delete) {
    variant = "delete";
    base += "shadow-lg";
  }

  if (props.muted) {
    variant = "muted";
  }

  if (props.default) {
    base += "primary";
  }

  if (props.pending) {
    return (
      <div className={`btn muted jc-c d-f ai-c disabled`} disabled>
        <span className="loading-dot"></span>
        <span className="loading-dot"></span>
        <span className="loading-dot"></span>
      </div>
    );
  } else {
    return (
      <button
        className={` ${base} ${variant} ${props.classes ? props.classes : ""}`}
        onClick={props.onClick}
        disabled={props.disabled}
        type={props.type}
      >
        {props.delete && deleteIcon}
        {props.children}
      </button>
    );
  }
};
