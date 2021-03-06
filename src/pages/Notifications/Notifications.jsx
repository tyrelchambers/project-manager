import { inject, observer } from "mobx-react";
import React from "react";
import { getAxios } from "../../api";
import { H1 } from "../../components/Headings/Headings";
import Notification from "../../components/Notification/Notification";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Notifications.css";

const Notifications = ({ NotificationStore }) => {
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
    }).then(({ success }) => {
      if (success) {
        NotificationStore.readAll();
      }
    });
  };

  const removeAll = () => {
    getAxios({
      url: "/notifications/clear",
      method: "post",
    }).then(({ success }) => {
      if (success) {
        NotificationStore.clear();
      }
    });
  };

  return (
    <DisplayWrapper>
      <div className="flex justify-between notifications-header">
        <H1>Notifications</H1>
        <div className="flex items-center notifications-actions">
          <div className="flex items-center mr-6" onClick={markAllAsRead}>
            <i className="fas fa-check text-yellow-400 mr-2"></i>
            <p className="text-yellow-400 underline">Mark all as read</p>
          </div>

          <div className="flex items-center " onClick={removeAll}>
            <i className="fas fa-eraser text-gray-500 mr-2"></i>
            <p className="text-gray-500 underline">Remove all</p>
          </div>
        </div>
      </div>
      <div className="unread-count">{unreadCount()}</div>

      <div className="mt-10">
        {NotificationStore.notifications.length > 0 &&
          NotificationStore.notifications
            .slice()
            .sort((a, b) => (a.date > b.date ? -1 : 1))
            .map((n, id) => <Notification key={id} n={n} />)}
      </div>
    </DisplayWrapper>
  );
};

export default inject("NotificationStore")(observer(Notifications));
