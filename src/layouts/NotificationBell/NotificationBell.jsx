import React from "react";
import { socket } from "../..";
import {
  followToast,
  heartToast,
} from "../../components/Notifications/Notifications";

const NotificationBell = () => {
  socket.on("notification", (data) => {
    if (data.type === "like") {
      heartToast();
    }

    if (data.type === "follow") {
      followToast();
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
