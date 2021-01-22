import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAxios } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import { H1 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { MainButton } from "../../components/Buttons/Buttons";
import FeedPost from "../../components/FeedPost/FeedPost";
import { inject, observer } from "mobx-react";
const UserShowPage = ({ ModalStore }) => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
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

  if (!user) return null;

  const clickhandler = (post) => {
    ModalStore.setRender(<FeedPost post={post} isModal={true} />);
    ModalStore.setIsOpen(true);
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
              <p className="font-bold text-3xl">1,000</p>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-300">Following</p>
              <p className="font-bold text-3xl">1,000</p>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-300">Snippets</p>
              <p className="font-bold text-3xl">1,000</p>
            </div>
          </div>

          <div className="max-w-2xl">
            <MainButton classes="mt-10" default>
              Follow {user.name}
            </MainButton>
          </div>

          <div className="container max-w-screen-lg">
            {user.FeedPosts.length === 0 && (
              <p className="font-bold text-center">Nothing to show!</p>
            )}
            {user.FeedPosts.sort((a, b) =>
              a.createdAt > b.createdAt ? -1 : 1
            ).map((post) => (
              <FeedPost post={post} clickHandler={() => clickhandler(post)} />
            ))}
          </div>
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default inject("ModalStore")(observer(UserShowPage));
