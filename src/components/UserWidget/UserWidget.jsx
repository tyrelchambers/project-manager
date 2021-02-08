import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import "./UserWidget.css";
const UserWidget = ({ UserStore }) => {
  return (
    <Link
      to={`/user/${UserStore.user.uuid}`}
      className="flex  user-widget-wrapper mt-4 mb-4"
    >
      <Avatar url={UserStore.user.avatar} size="small" />
      <div className="flex flex-col ml-4">
        <p>Signed in as</p>
        <p className="text-white font-bold text-2xl break-words">
          {UserStore.user.name ? UserStore.user.name : UserStore.user.email}
        </p>
      </div>
    </Link>
  );
};

export default inject("UserStore")(observer(UserWidget));
