import React, { useEffect, useState } from "react";
import "./FeedPost.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Avatar from "../Avatar/Avatar";
import Code from "../Code/Code";
import { Link } from "react-router-dom";
import { getAxios } from "../../api";
import { socket } from "../..";
import { bookmarkToast } from "../Notifications/Notifications";

const FeedPost = ({ post, clickHandler, isModal, user }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = post.likedPosts.filter((l) => l.uuid === user.uuid);

    if (liked.length > 0) {
      setIsLiked(true);
    }
  }, [user]);

  const bookmarkHandler = async () => {
    await getAxios({
      url: "/bookmarks/save",
      method: "post",
      data: {
        postId: post.uuid,
      },
    }).then((res) => bookmarkToast());
  };

  const likeHandler = async () => {
    await getAxios({
      url: `/feed/${post.uuid}/like`,
      method: "post",
    }).then((res) => {
      setIsLiked(true);
      socket.emit("notification", {
        from: user.uuid,
        to: post.User.uuid,
        type: "like",
      });
    });
  };

  const dislikeHandler = async () => {
    await getAxios({
      url: `/feed/${post.uuid}/dislike`,
      method: "delete",
    }).then((res) => setIsLiked(false));
  };

  const likeIcon = isLiked ? (
    <i className="fas fa-heart  text-red-500" onClick={dislikeHandler}></i>
  ) : (
    <i className="far fa-heart  text-gray-500" onClick={likeHandler}></i>
  );

  return (
    <div className="feed-post-border">
      <div
        className={`feed-post flex p-4 rounded-lg ${
          isModal ? "" : "is-not-modal"
        }`}
      >
        <div className="feed-post-body flex flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <div className="mr-4">
                <Avatar url={post.User.avatar} size="small" />
              </div>

              <Link
                to={`/user/${post.User.uuid}`}
                className="font-bold mb-2 text-lg text-gray-200 hover:underline"
              >
                {post.User.name}
              </Link>
            </div>
            <p className="italic text-sm text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </p>
          </div>

          <p
            className="text-white mt-8 mb-8 font-bold post-body"
            onClick={clickHandler}
          >
            {post.post}
          </p>
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
              {likeIcon}
            </div>

            <div className="flex items-center raised-icon small">
              <i
                className="fas fa-bookmark text-gray-800"
                onClick={bookmarkHandler}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
