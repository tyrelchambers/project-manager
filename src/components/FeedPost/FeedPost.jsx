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

const FeedPost = ({
  ModalStore,
  post,
  user,
  hideOnMobile = true,
  stacked,
  isBookmarked,
}) => {
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
    if (isBookmarked) {
      await getAxios({
        url: "/bookmarks/remove",
        method: "delete",
        data: {
          postId: post.uuid,
        },
      }).then(({ success }) => {
        if (success) {
          window.location.reload();
        }
      });
    } else {
      await getAxios({
        url: "/bookmarks/save",
        method: "post",
        data: {
          postId: post.uuid,
        },
      });
    }
  };

  const likeHandler = async () => {
    await getAxios({
      url: `/feed/${post.uuid}/like`,
      method: "post",
    }).then(({ success }) => {
      if (success) {
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
    }).then(({ success }) => setIsLiked(false));
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

  const deletePost = () => {
    getAxios({
      url: `/feed/${post.uuid}`,
      method: "delete",
    });
    window.location.reload();
  };

  return (
    <div className="feed-post-border">
      <div className={`feed-post flex p-4 rounded-lg`}>
        <div className={`feed-post-body flex ${stacked && "flex-col"} w-full`}>
          {!stacked && (
            <div className="mr-4 flex flex-col items-center">
              <Avatar url={post.User.avatar} size="small" />
              <i
                className="fas fa-trash text-red-500 mt-6"
                onClick={deletePost}
              ></i>
            </div>
          )}
          {stacked && (
            <div className="flex justify-between items-center w-full mb-4">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <Avatar url={post.User.avatar} size="small" />
                  <i className="fas fa-trash text-red-500"></i>
                </div>

                <div className="flex flex-col ml-2">
                  <Link
                    to={`/user/${post.User.uuid}`}
                    className=" mb-2  text-gray-200 hover:underline truncate feed-post-username"
                  >
                    <p className="font-black text-lg text-gray-200">
                      {post.User.name || post.User.email}
                    </p>
                    <p className="italic text-gray-400 text-sm">
                      @{post.User.username}
                    </p>
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
                <Link
                  to={`/user/${post.User.uuid}`}
                  className="mb-2 text-gray-200 hover:underline truncate feed-post-username flex items-center w-3/4"
                >
                  <p className="font-black text-lg text-gray-200 truncate">
                    {post.User.name}

                    <span className="italic text-gray-400 text-sm ml-2 font-thin">
                      @{post.User.username}
                    </span>
                  </p>
                </Link>
                <p className="italic text-sm text-gray-400 ">
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
            {post.CodeSnippet?.deleteDate && (
              <div className="flex bg-yellow-400 p-2 rounded-md">
                <i className="fas fa-exclamation-triangle text-gray-800 mr-2 mt-1"></i>
                <p className="text-gray-800">
                  This code snippet is set to be deleted. If you'd like to hang
                  onto it, please copy it and create your own snippet.
                </p>
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
                    text={
                      isBookmarked
                        ? "Remove from bookmarks"
                        : "Add to bookmarks"
                    }
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
