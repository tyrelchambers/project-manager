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
import "./UserShowPage.css";
import UserSocials from "../../layouts/UserSocials/UserSocials";
import UserSubNav from "../../layouts/UserSubNav/UserSubNav";
import UserBadge from "../../components/UserBadge/UserBadge";
import SnippetItem from "../../components/SnippetItem/SnippetItem";
const UserShowPage = ({ UserStore }) => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const [tab, setTab] = useState("feed");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    setTab("feed");

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
  }, [user_id]);

  useEffect(() => {
    if (tab === "followers") {
      getAxios({
        url: `/user/${user_id}/followers`,
      }).then((res) => setFollowers(res.followers));
    }

    if (tab === "following") {
      getAxios({
        url: `/user/${user_id}/following`,
      }).then((res) => setFollowing(res.following));
    }

    if (tab === "snippets") {
      getAxios({
        url: `/user/${user_id}/snippets`,
      }).then((res) => setSnippets(res.snippets));
    }
  }, [tab, user_id]);

  useEffect(() => {
    if (UserStore.user && user) {
      const alreadyFollowing = user.followers.filter(
        (f) => f.uuid === UserStore.user.uuid
      );

      alreadyFollowing.length === 0
        ? setIsFollowing(false)
        : setIsFollowing(true);
    }
  }, [UserStore.user, user]);

  if (!user) return null;

  const followHandler = async () => {
    await getAxios({
      url: "/social/follow",
      method: "post",
      data: {
        toFollow: user_id,
      },
    });
    socket.emit("notification user follow", {
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

  return (
    <DisplayWrapper className="relative" hideNavbar>
      <div className="user-show-wrapper flex justify-center relative">
        <div className="flex flex-col items-center container max-w-screen-md">
          <Avatar url={user.avatar} size="large" />
          <H1 className="mt-4 user-name">{user.name || user.email}</H1>

          <pre className="mt-4 mb-4 text-white user-bio">{user.bio}</pre>

          <UserSocials user={user} />

          <div className="flex items-center w-full justify-evenly mt-6">
            <div className="flex flex-col">
              <p className="font-bold text-3xl">{user.followers.length}</p>
              <p className="text-gray-300">Followers</p>
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-3xl">{user.followees.length}</p>
              <p className="text-gray-300">Following</p>
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-3xl">{user.CodeSnippets.length}</p>
              <p className="text-gray-300">Snippets</p>
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

          <UserSubNav tab={tab} setTab={setTab} />

          <div className="container max-w-screen-lg mt-6">
            {tab === "feed" && user.posts.length === 0 && (
              <p className="font-bold text-center">Nothing to show!</p>
            )}
            {tab === "feed" &&
              user.posts
                .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                .map((post) => (
                  <FeedPost key={post.uuid} post={post} user={UserStore.user} />
                ))}

            {tab === "followers" &&
              followers.length > 0 &&
              followers.map((f) => <UserBadge user={f} key={f.uuid} />)}

            {tab === "following" &&
              following.length > 0 &&
              following.map((f) => <UserBadge user={f} key={f.uuid} />)}

            {tab === "snippets" && (
              <div className="snippet-list grid grid-cols-3 mt-5 gap-4">
                {snippets.map((f) => (
                  <SnippetItem snippet={f} key={f.uuid} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(UserShowPage));
