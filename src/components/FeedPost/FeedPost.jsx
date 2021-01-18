import React from "react";
import "./FeedPost.css";

const FeedPost = ({ post }) => {
  return (
    <div className="feed-post flex bg-gray-800 p-4 rounded-lg box-shadow">
      <div className="flex flex-col items-center mr-6">
        <img src={post.user.avatar} className="avatar-small" />
        <div className="flex items-center mt-4">
          <i className="fas fa-heart mr-2 text-red-500"></i>
          <p className="font-bold">{post.likes.length}</p>
        </div>

        <div className="flex items-center mt-4">
          <i className="far fa-bookmark text-gray-400"></i>
        </div>
      </div>
      <div className="feed-post-body">
        <p className="font-bold mb-2 text-lg">{post.user.name}</p>
        <p className="text-gray-400">{post.text}</p>
      </div>
    </div>
  );
};

export default FeedPost;
