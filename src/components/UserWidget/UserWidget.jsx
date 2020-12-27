import { inject, observer } from "mobx-react";
import React from "react";
import "./UserWidget.css";
const UserWidget = ({ UserStore }) => {
  return (
    <div className="flex flex-col user-widget-wrapper p-4">
      {/* <img
        src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=896&q=80"
        alt=""
        className="avatar"
      /> */}
      <p>Signed in as</p>
      <p className="text-white font-bold text-2xl break-words">
        {UserStore.user.name ? UserStore.user.name : UserStore.user.email}
      </p>
    </div>
  );
};

export default inject("UserStore")(observer(UserWidget));
