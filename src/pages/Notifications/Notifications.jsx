import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import { getAxios } from "../../api";
import { H1 } from "../../components/Headings/Headings";
import Notification from "../../components/Notification/Notification";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const Notifications = ({ NotificationStore }) => {
  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/notifications",
      }).then((res) => {
        if (res) {
          NotificationStore.setNotifications(res.notifications);
        }
      });
    };

    fn();
  }, [NotificationStore.notifications]);

  const unreadCount = () => {
    if (NotificationStore.notifications.length === 0) return null;
    const unread = NotificationStore.notifications.filter(
      (n) => n.unread === true
    );
    return unread.length > 0 ? (
      <p className="text-yellow-400">
        <span className="font-bold">{unread.length} </span>unread notifications
      </p>
    ) : null;
  };

  const markAllAsRead = () => {
    getAxios({
      url: "/notifications/readall",
    }).then((res) => {
      if (res) {
        NotificationStore.setUnread(0);
      }
    });
  };

  return (
    <DisplayWrapper>
      <div className="flex justify-between">
        <H1>Notifications</H1>
        <div className="flex items-center " onClick={markAllAsRead}>
          <i className="fas fa-check text-yellow-400 mr-2"></i>
          <p className="text-yellow-400 underline">Mark all as read</p>
        </div>
      </div>
      {unreadCount()}

      <div className="mt-10">
        {NotificationStore.notifications.length > 0 &&
          NotificationStore.notifications
            .slice()
            .sort((a, b) => (a.date > b.date ? -1 : 1))
            .map((n) => <Notification n={n} />)}
      </div>
    </DisplayWrapper>
  );
};

export default inject("NotificationStore")(observer(Notifications));
