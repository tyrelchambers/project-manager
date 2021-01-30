import React, { useEffect, useState } from "react";
import "./FeedPost.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Avatar from "../Avatar/Avatar";
import Code from "../Code/Code";
import { Link } from "react-router-dom";
import { getAxios } from "../../api";
import { socket } from "../..";
import { bookmarkToast } from "../NotificationToasts/NotificationToasts";
import Status from "../Status/Status";

const FeedPost = ({ post, user }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (user) {
      const liked = post.likedPosts.filter((l) => l.uuid === user.uuid);

      if (liked.length > 0) {
        setIsLiked(true);
      }
    }
  }, []);

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
      if (res) {
        setIsLiked(true);
        socket.emit("notification post like", {
          from: user.uuid,
          to: post.User.uuid,
          type: "post_like",
          post: post.uuid,
        });
      }
    });
  };

  const dislikeHandler = async () => {
    await getAxios({
      url: `/feed/${post.uuid}/dislike`,
      method: "delete",
    }).then((res) => setIsLiked(false));
  };

  const likeIcon = isLiked ? (
    <i className="fas fa-heart  text-red-500 mr-2" onClick={dislikeHandler}></i>
  ) : (
    <i className="far fa-heart  text-gray-500 mr-2" onClick={likeHandler}></i>
  );

  return (
    <div className="feed-post-border">
      <div className={`feed-post flex p-4 rounded-lg`}>
        <div className="feed-post-body flex w-full">
          <div className="mr-4">
            <Avatar url={post.User.avatar} size="small" />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <Link
                  to={`/user/${post.User.uuid}`}
                  className="font-black mb-2 text-lg text-gray-200 hover:underline"
                >
                  {post.User.name}
                </Link>
              </div>
              <p className="italic text-sm text-gray-400">
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </p>
            </div>

            <Link
              to={`/post/${post.uuid}`}
              className="text-white mt-2 mb-2 post-body"
            >
              {post.post}
            </Link>
            {post.CodeSnippet && (
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
              {user.uuid && (
                <>
                  <Status
                    icon={likeIcon}
                    text="like this code"
                    wrapperClass="bg-gray-800 cursor-pointer m-2"
                    textClass="text-gray-200"
                  />
                  <Status
                    icon={
                      <i
                        className="fas fa-bookmark text-gray-200 mr-2"
                        onClick={bookmarkHandler}
                      ></i>
                    }
                    text="Add to bookmarks"
                    wrapperClass="bg-gray-800 cursor-pointer m-2"
                    textClass="text-gray-200"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
