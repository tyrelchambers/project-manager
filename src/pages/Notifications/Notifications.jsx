import React, { useEffect, useState } from "react";
import { getAxios } from "../../api";
import { H1 } from "../../components/Headings/Headings";
import Notification from "../../components/Notification/Notification";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/notifications",
      }).then((res) => {
        if (res) {
          setNotifications(res.notifications);
        }
      });
    };

    fn();
  }, []);

  const unreadCount = () => {
    if (notifications.length === 0) return null;
    const unread = notifications.filter((n) => n.unread === true);
    return unread.length > 0 ? (
      <p className="text-yellow-400">
        <span className="font-bold">{unread.length} </span>unread notifications
      </p>
    ) : null;
  };

  return (
    <DisplayWrapper>
      <H1>Notifications</H1>
      {unreadCount()}

      <div className="mt-10">
        {notifications.length > 0 &&
          notifications
            .sort((a, b) => (a.date > b.date ? -1 : 1))
            .map((n) => <Notification n={n} />)}
      </div>
    </DisplayWrapper>
  );
};

export default Notifications;
