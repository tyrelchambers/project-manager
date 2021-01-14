import React from "react";
import "./FeedPost.css";

const FeedPost = ({ post }) => {
  return (
    <div className="feed-post flex">
      <div className="flex flex-col items-center mr-6">
        <img src={post.user.avatar} className="avatar-small" />
        <div className="flex items-center mt-4">
          <i className="fas fa-heart mr-2 text-red-500"></i>
          <p className="font-bold">{post.likes.length}</p>
        </div>
      </div>
      <div className="feed-post-body">
        <p>{post.text}</p>
      </div>
    </div>
  );
};

export default FeedPost;
