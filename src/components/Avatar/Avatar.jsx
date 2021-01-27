import React from "react";
import "./Avatar.css";

const Avatar = ({ url, size, className }) => {
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
      className={`avatar ${avatarSize} no-image ${className ? className : ""}`}
    >
      <i
        className={`fas fa-user-astronaut ${
          avatarSize !== "sm" ? "text-2xl" : "text-sm"
        }`}
      ></i>
    </div>
  );

  return url ? (
    <img
      src={url}
      className={`avatar box-shadow ${avatarSize} ${
        className ? className : ""
      }`}
      alt="Profile"
    />
  ) : (
    noImage
  );
};

export default Avatar;
