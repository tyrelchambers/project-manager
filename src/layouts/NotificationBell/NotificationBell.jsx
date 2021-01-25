import React from "react";

const NotificationBell = () => {
  return (
    <>
      <i className="fas fa-bell"></i>
      <div className="notification-badge bg-gray-800 box-shadow">
        <p className="font-black text-white text-xs">3</p>
      </div>
    </>
  );
};

export default NotificationBell;
