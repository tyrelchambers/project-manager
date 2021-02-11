import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import NewFeedPostForm from "../../forms/NewFeedPostForm";
import Avatar from "../Avatar/Avatar";
import FeedSnippetSearch from "../FeedSnippetSearch/FeedSnippetSearch";
import "./NewFeedPost.css";

const NewFeedPost = ({ UserStore }) => {
  const [toggleCode, setToggleSearch] = useState(false);

  return (
    <div className="new-feed-post rounded-lg  container max-w-screen-lg mb-16">
      <div className="flex items-center justify-between new-feed-header">
        <div className="flex items-center">
          <Avatar url={UserStore.user.avatar} size="small" />
          <div className="flex flex-col ml-4">
            <p className="text-sm">Posting as:</p>
            <p className="font-bold text-lg">{UserStore.user.name}</p>
          </div>
        </div>
      </div>
      <NewFeedPostForm />
      <div className="feed-post-actions flex justify-start mt-6 flex-1 items-center ">
        <i
          className="fas fa-code text-gray-400 mr-4"
          onClick={() => setToggleSearch(!toggleCode)}
        ></i>
        {toggleCode && <FeedSnippetSearch />}
      </div>
    </div>
  );
};

export default inject("UserStore")(observer(NewFeedPost));
