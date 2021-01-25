import React from "react";
import { socket } from "../..";
import { heartToast } from "../../components/Notifications/Notifications";

const NotificationBell = () => {
  socket.on("notification", (data) => {
    if (data.type === "post_like") {
      heartToast();
    }
  });

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
