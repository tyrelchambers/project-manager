import React from "react";
import "./Avatar.css";

const Avatar = ({ url, size, className, square }) => {
  let avatarSize = "xs";

  if (size === "small") {
    avatarSize = "sm";
  }

  if (size === "large") {
    avatarSize = "lg";
  }

  if (size === "medium") {
    avatarSize = "md";
  }

  const noImage = (
    <div
      className={`avatar ${
        square ? "square" : "circle"
      } ${avatarSize} no-image ${className ? className : ""}`}
    >
      <i
        className={`fas fa-user-astronaut ${
          avatarSize !== "sm" ? "text-2xl" : "text-sm"
        }`}
      ></i>
    </div>
  );

  if (!url) {
    return noImage;
  }

  return (
    <img
      src={url}
      className={`avatar ${
        square ? "square" : "circle"
      } box-shadow ${avatarSize} ${className ? className : ""}`}
      alt="Profile"
    />
  );
};

export default Avatar;
