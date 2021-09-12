import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import "./UserWidget.css";
const UserWidget = ({ user }) => {
  return (
    <Link
      to={`/user/${user.uuid}`}
      className="flex  user-widget-wrapper mt-4 mb-4"
    >
      <Avatar url={user.avatar} size="small" />
      <div className="flex flex-col ml-4">
        <p>Signed in as</p>
        <p className="text-white font-bold text-2xl break-all">{user.name}</p>
      </div>
    </Link>
  );
};

export default UserWidget;
