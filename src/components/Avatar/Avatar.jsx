import React from "react";
import "./Avatar.css";

const Avatar = ({ url, size, className }) => {
  let avatarSize;

  if (size === "small") {
    avatarSize = "sm";
  }

  if (size === "large") {
    avatarSize = "lg";
  }

  const noImage = (
    <div className={`avatar ${avatarSize} no-image`}>
      <i
        className={`fas fa-user-astronaut ${
          avatarSize === "lg" ? "text-5xl" : "text-sm"
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
