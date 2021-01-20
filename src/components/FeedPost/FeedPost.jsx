import React, { useState } from "react";
import "./FeedPost.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Avatar from "../Avatar/Avatar";
import Code from "../Code/Code";
import { MainButton } from "../Buttons/Buttons";

const FeedPost = ({ post }) => {
  const [expandSnippet, setExpandSnippet] = useState(false);
  return (
    <div className="feed-post flex bg-gray-700 p-4 rounded-lg box-shadow">
      <div className="flex flex-col items-center mr-6">
        <Avatar url={post.User.avatar} size="small" />
      </div>
      <div className="feed-post-body w-full">
        <div className="flex justify-between w-full">
          <p className="font-bold mb-2 text-lg text-gray-400">
            {post.User.name}
          </p>
          <p className="italic text-sm text-gray-400">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </p>
        </div>
        <p className="text-white">{post.post}</p>
        {post.CodeSnippet && (
          <div className="flex flex-col">
            <div
              style={{
                height: expandSnippet ? "fit-content" : "100px",
                overflowY: "hidden",
              }}
              className="post-snippet-wrapper rounded-md mt-2 mb-4"
            >
              <Code language="js" code={post.CodeSnippet.snippet} />
            </div>
            <MainButton muted onClick={() => setExpandSnippet(!expandSnippet)}>
              {expandSnippet ? "Hide Snippet" : "Show snippet"}
            </MainButton>
          </div>
        )}
        <div className="flex items-center">
          <div className="flex items-center mt-4 mr-8">
            <i className="fas fa-heart  text-red-500"></i>
            {/* <p className="font-bold">{post.likes.length}</p> */}
          </div>

          <div className="flex items-center mt-4">
            <i className="far fa-bookmark text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
