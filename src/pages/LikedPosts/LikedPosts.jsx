import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getAxios } from "../../api";
import FeedPost from "../../components/FeedPost/FeedPost";
import { H1 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const LikedPosts = ({ UserStore, ModalStore }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/user/likes",
      }).then((res) => setPosts(res.likes));
    };

    fn();
  }, []);

  const clickhandler = (post) => {
    ModalStore.setRender(
      <FeedPost user={UserStore.user} post={post} isModal={true} />
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
              user={UserStore.user}
              key={post.id}
              post={post}
              clickHandler={() => clickhandler(post)}
            />
          ))}
    </DisplayWrapper>
  );
};

export default inject("UserStore", "ModalStore")(observer(LikedPosts));
