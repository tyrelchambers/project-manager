import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getAxios } from "../../api";
import FeedPost from "../../components/FeedPost/FeedPost";
import { H1 } from "../../components/Headings/Headings";
import { useUser } from "../../hooks/useUser";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const LikedPosts = ({ ModalStore }) => {
  const [posts, setPosts] = useState([]);
  const userQuery = useUser();

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/user/likes",
      }).then(({ success }) => setPosts(success.likes));
    };

    fn();
  }, []);

  if (!userQuery.data) return null;

  const clickhandler = (post) => {
    ModalStore.setRender(
      <FeedPost user={userQuery.data.user} post={post} isModal={true} />
    );
    ModalStore.setIsOpen(true);
  };

  return (
    <DisplayWrapper>
      <H1>Liked Posts</H1>
      {posts.length === 0 && <p className="font-bold">No liked posts</p>}

      {posts.length > 0 &&
        posts
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          .map((post) => (
            <FeedPost
              user={userQuery.data.user}
              key={post.id}
              post={post}
              clickHandler={() => clickhandler(post)}
            />
          ))}
    </DisplayWrapper>
  );
};

export default inject("ModalStore")(observer(LikedPosts));
