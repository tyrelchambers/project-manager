import React from "react";
import { Link } from "react-router-dom";
import NotificationBell from "../../layouts/NotificationBell/NotificationBell";
import "./NavToolbar.css";

const NavToolbar = ({ user }) => {
  return (
    <div className="flex nav-toolbar-wrapper rounded-lg pt-2 pb-2 pr-4 pl-4 justify-around box-shadow">
      <Link to={`/user/${user.uuid}`} className="nav-toolbar-item">
        <i className="fas fa-user-astronaut"></i>
      </Link>

      <Link to={`/bookmarks`} className="nav-toolbar-item">
        <i className="fas fa-bookmark"></i>
      </Link>

      <Link to={`/likes`} className="nav-toolbar-item">
        <i className="fas fa-heart"></i>
      </Link>

      <Link
        to="/notifications"
        className="nav-toolbar-item with-badge relative"
      >
        <NotificationBell />
      </Link>
    </div>
  );
};

export default NavToolbar;
