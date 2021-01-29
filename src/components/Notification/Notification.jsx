import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import "./Notification.css";
import { getIcon } from "./notificationIcon";
import { getType } from "./types";
const Notification = ({ n }) => {
  return (
    <div className="notification flex items-center">
      {n.unread && <span className="notification-unread"></span>}
      <div className="relative mr-4">
        <Avatar url={n.from.avatar} size="medium" />
        {getIcon(n.type)}
      </div>
      <div className="flex flex-col">
        <p>
          <Link to={`/user/${n.from.uuid}`} className="font-bold underline">
            {n.from.name}{" "}
          </Link>
          {getType({ type: n.type, target: n.post.uuid })}
        </p>
        <p className="text-yellow-400 italic">
          {" "}
          {formatDistanceToNow(new Date(n.date))} ago
        </p>
      </div>
    </div>
  );
};

export default Notification;
