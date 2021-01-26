import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAxios } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import { H1 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { MainButton } from "../../components/Buttons/Buttons";
import FeedPost from "../../components/FeedPost/FeedPost";
import { inject, observer } from "mobx-react";
import { socket } from "../..";
const UserShowPage = ({ ModalStore, UserStore }) => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/user/${user_id}`,
      }).then((res) => {
        if (res) {
          setUser(res.user);
        }
      });
    };

    fn();
  }, []);

  useEffect(() => {
    if (user) {
      const alreadyFollowing = user.followers.filter(
        (f) => f.uuid === UserStore.user.uuid
      );

      alreadyFollowing.length === 0
        ? setIsFollowing(false)
        : setIsFollowing(true);
    }
  }, [user]);

  if (!user) return null;

  const clickhandler = (post) => {
    ModalStore.setRender(
      <FeedPost post={post} user={UserStore.user} isModal={true} />
    );
    ModalStore.setIsOpen(true);
  };

  const followHandler = async () => {
    await getAxios({
      url: "/social/follow",
      method: "post",
      data: {
        toFollow: user_id,
      },
    });
    socket.emit("notification", {
      from: UserStore.user.uuid,
      to: user_id,
      type: "follow",
    });
    setIsFollowing(true);
  };

  const unfollowHandler = async () => {
    await getAxios({
      url: "/social/unfollow",
      method: "post",
      data: {
        toUnfollow: user_id,
      },
    });

    setIsFollowing(false);
  };

  return (
    <DisplayWrapper hideNavbar>
      <div className="user-show-wrapper flex justify-center">
        <div className="flex flex-col items-center container max-w-screen-md">
          <Avatar url={user.avatar} size="large" />
          <H1 className="mt-4">{user.name}</H1>

          <div className="flex items-center w-full justify-evenly mt-6">
            <div className="flex flex-col">
              <p className="text-gray-300">Followers</p>
              <p className="font-bold text-3xl">{user.followers.length}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-300">Following</p>
              <p className="font-bold text-3xl">{user.followees.length}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-300">Snippets</p>
              <p className="font-bold text-3xl">{user.CodeSnippets.length}</p>
            </div>
          </div>

          {UserStore.user.uuid && UserStore.user.uuid !== user.uuid && (
            <div className="max-w-2xl">
              <FollowButton
                isFollowing={isFollowing}
                followHandler={followHandler}
                unfollowHandler={unfollowHandler}
                user={user}
              />
            </div>
          )}

          <div className="container max-w-screen-lg">
            {user.posts.length === 0 && (
              <p className="font-bold text-center">Nothing to show!</p>
            )}
            {user.posts
              .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
              .map((post) => (
                <FeedPost
                  key={post.uuid}
                  post={post}
                  user={UserStore.user}
                  clickHandler={() => clickhandler(post)}
                />
              ))}
          </div>
        </div>
      </div>
    </DisplayWrapper>
  );
};

const FollowButton = ({
  isFollowing,
  user,
  followHandler,
  unfollowHandler,
}) => {
  return !isFollowing ? (
    <MainButton classes="mt-10" default onClick={followHandler}>
      Follow {user.name}
    </MainButton>
  ) : (
    <MainButton classes="mt-10" muted onClick={unfollowHandler}>
      Unfollow {user.name}
    </MainButton>
  );
};

export default inject("ModalStore", "UserStore")(observer(UserShowPage));
