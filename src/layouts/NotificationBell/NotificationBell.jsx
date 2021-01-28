import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import { socket } from "../..";
import {
  followToast,
  heartToast,
} from "../../components/NotificationToasts/NotificationToasts";

const NotificationBell = ({ NotificationStore }) => {
  useEffect(() => {
    socket.on("notification", (data) => {
      if (data.type === "post_like") {
        heartToast();
      }

      if (data.type === "follow") {
        followToast();
      }
    });
  }, []);

  const unreadCount = () => {
    return NotificationStore.notifications.filter((n) => n.unread === true)
      .length;
  };
  return (
    <>
      <i className="fas fa-bell"></i>
      <div className="notification-badge bg-gray-800 box-shadow">
        <p className="font-black text-white text-xs">{unreadCount()}</p>
      </div>
    </>
  );
};

export default inject("NotificationStore")(observer(NotificationBell));
