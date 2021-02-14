import React, { useEffect, useState } from "react";
import "./FeedPost.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Avatar from "../Avatar/Avatar";
import Code from "../Code/Code";
import { Link } from "react-router-dom";
import { getAxios } from "../../api";
import { socket } from "../..";
import Status from "../Status/Status";
import { inject, observer } from "mobx-react";
import { docWidth } from "../../constants/constants";

const FeedPost = ({ ModalStore, post, user, hideOnMobile = true, stacked }) => {
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
    });
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
    <i className="fas fa-heart  text-red-500 mr-2"></i>
  ) : (
    <i className="far fa-heart  text-gray-500 mr-2"></i>
  );

  const mobileSnippetHandler = () => {
    ModalStore.setRender(
      <Code
        language={post.CodeSnippet.syntax}
        code={post.CodeSnippet.snippet}
      />
    );
    ModalStore.setIsOpen(true);
  };

  return (
    <div className="feed-post-border">
      <div className={`feed-post flex p-4 rounded-lg`}>
        <div className={`feed-post-body flex ${stacked && "flex-col"} w-full`}>
          {!stacked && (
            <div className="mr-4">
              <Avatar url={post.User.avatar} size="small" />
            </div>
          )}
          {stacked && (
            <div className="flex justify-between items-center w-full mb-4">
              <div className="flex items-center">
                <Avatar url={post.User.avatar} size="small" />

                <div className="flex flex-col ml-2">
                  <Link
                    to={`/user/${post.User.uuid}`}
                    className="font-black mb-2 text-lg text-gray-200 hover:underline truncate feed-post-username"
                  >
                    {post.User.name}
                  </Link>
                  <p className="italic text-sm text-gray-400">
                    {formatDistanceToNow(new Date(post.createdAt))} ago
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col w-full">
            {!stacked && (
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <Link
                    to={`/user/${post.User.uuid}`}
                    className="font-black mb-2 text-lg text-gray-200 hover:underline truncate feed-post-username"
                  >
                    {post.User.name}
                  </Link>
                </div>
                <p className="italic text-sm text-gray-400">
                  {formatDistanceToNow(new Date(post.createdAt))} ago
                </p>
              </div>
            )}

            <Link
              to={`/post/${post.uuid}`}
              className="text-white mt-2 mb-2 post-body"
            >
              {post.post}
            </Link>
            {post.CodeSnippet && !docWidth && (
              <div className="flex flex-col">
                <div
                  style={{
                    overflowY: "hidden",
                  }}
                  className="post-snippet-wrapper rounded-md mt-2 mb-4 h-fit"
                >
                  <Code
                    language={post.CodeSnippet.syntax}
                    code={post.CodeSnippet.snippet}
                  />
                </div>
              </div>
            )}
            <div className="flex items-center mt-4">
              {user.uuid && (
                <>
                  <Status
                    icon={likeIcon}
                    text="like this code"
                    wrapperClass="bg-gray-800 cursor-pointer m-2 "
                    textClass="text-gray-200"
                    onClick={isLiked ? dislikeHandler : likeHandler}
                    hideOnMobile={hideOnMobile}
                  />
                  <Status
                    icon={
                      <i className="fas fa-bookmark text-gray-200 mr-2"></i>
                    }
                    text="Add to bookmarks"
                    wrapperClass="bg-gray-800 cursor-pointer m-2"
                    textClass="text-gray-200"
                    onClick={bookmarkHandler}
                    hideOnMobile={hideOnMobile}
                  />
                </>
              )}
              {post.CodeSnippet && docWidth && (
                <Status
                  icon={<i className="fas fa-laptop-code text-gray-200 "></i>}
                  onClick={mobileSnippetHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default inject("ModalStore")(observer(FeedPost));
