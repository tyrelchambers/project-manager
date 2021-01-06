import React from "react";
import "./buttons.css";

export const MainButton = (props) => {
  let base = "btn primary";
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
    variant = "bg-pink-500";
  }

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
};
