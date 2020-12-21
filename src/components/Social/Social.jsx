import React from "react";
import "./Social.css";
const Social = ({ icons }) => {
  return (
    <div className="flex social-icon-wrapper">
      <i className="fab fa-twitter"></i>
      <i className="fab fa-facebook-square"></i>
    </div>
  );
};

export default Social;
