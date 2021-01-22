import React from "react";
import "./FeedPost.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Avatar from "../Avatar/Avatar";
import Code from "../Code/Code";

const FeedPost = ({ post, clickHandler, isModal }) => {
  return (
    <div className="feed-post-border">
      <div
        className={`feed-post flex p-4 rounded-lg ${
          isModal ? "" : "is-not-modal"
        }`}
        onClick={clickHandler}
      >
        <div className="feed-post-body flex flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <div className="mr-4">
                <Avatar url={post.User.avatar} size="small" />
              </div>

              <p className="font-bold mb-2 text-lg text-gray-200">
                {post.User.name}
              </p>
            </div>
            <p className="italic text-sm text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </p>
          </div>

          <p className="text-white mt-8 mb-8 font-bold">{post.post}</p>
          {post.CodeSnippet && isModal && (
            <div className="flex flex-col">
              <div
                style={{
                  overflowY: "hidden",
                }}
                className="post-snippet-wrapper rounded-md mt-2 mb-4 h-fit"
              >
                <Code language="js" code={post.CodeSnippet.snippet} />
              </div>
            </div>
          )}
          <div className="flex items-center mt-4">
            {post.CodeSnippet && !isModal && (
              <div
                className="flex items-center raised-icon primary mr-8"
                onClick={clickHandler}
              >
                <i className="fas fa-grip-horizontal text-white text-xl mr-4"></i>
                <p className="font-bold text-white">View snippet</p>
              </div>
            )}
            <div className="flex items-center  mr-8 raised-icon small">
              <i className="fas fa-heart  text-red-500"></i>
              {/* <p className="font-bold">{post.likes.length}</p> */}
            </div>

            <div className="flex items-center raised-icon small">
              <i className="far fa-bookmark text-gray-800"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
