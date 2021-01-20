import { inject, observer } from "mobx-react";
import React from "react";
import NewFeedPostForm from "../../forms/NewFeedPostForm";
import Avatar from "../Avatar/Avatar";

const NewFeedPost = ({ UserStore }) => {
  return (
    <div className="new-feed-post rounded-lg  container max-w-screen-lg mb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar url={UserStore.user.avatar} size="small" />
          <div className="flex flex-col ml-4">
            <p className="text-sm">Posting as:</p>
            <p className="font-bold text-lg">{UserStore.user.name}</p>
          </div>
        </div>

        <div className="feed-post-actions">
          <i className="fas fa-code text-gray-600" title="Add snippet"></i>
        </div>
      </div>
      <NewFeedPostForm />
    </div>
  );
};

export default inject("UserStore")(observer(NewFeedPost));
