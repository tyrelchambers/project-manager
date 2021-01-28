import React from "react";

const icons = {
  post_like: (
    <span className="notification-icon pink-gradient box-shadow">
      <i className="fas fa-heart text-white"></i>
    </span>
  ),

  follow: (
    <span className="notification-icon dark-gradient box-shadow">
      <i className="fas fa-exchange-alt text-white "></i>
    </span>
  ),
};

export const getIcon = (type) => {
  return icons[type];
};
