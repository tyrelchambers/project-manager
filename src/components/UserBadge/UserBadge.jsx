import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import "./UserBadge.css";

const UserBadge = ({ user }) => {
  return (
    <div className="user-badge flex rounded-lg overflow-hidden bg-gray-900 box-shadow">
      <div className="user-avatar">
        <Avatar url={user.avatar} size="medium" square />
      </div>

      <div className="user-badge-info flex flex-col pl-3 pr-3 pt-2">
        <Link
          to={`/user/${user.uuid}`}
          className="font-bold text-xl text-white"
        >
          {user.name || user.email}
        </Link>
        <p className="text-gray-500 truncate">{user.bio}</p>
      </div>
    </div>
  );
};

export default UserBadge;
