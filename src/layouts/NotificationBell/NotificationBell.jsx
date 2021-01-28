import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";

const NotificationBell = ({ NotificationStore }) => {
  const [unread, setUnread] = useState(() => {
    return NotificationStore.notifications.filter((n) => n.unread === true)
      .length;
  });

  useEffect(() => {
    console.log(
      NotificationStore.notifications.filter((n) => n.unread === true)
    );
    setUnread(
      NotificationStore.notifications.filter((n) => n.unread === true).length
    );
    console.log("called");
  }, [NotificationStore.notifications]);

  return (
    <>
      <i className="fas fa-bell"></i>
      <div className="notification-badge bg-gray-800 box-shadow">
        <p className="font-black text-white text-xs">{unread}</p>
      </div>
    </>
  );
};

export default inject("NotificationStore")(observer(NotificationBell));
