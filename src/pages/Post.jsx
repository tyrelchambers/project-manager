import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAxios } from "../api";
import FeedPost from "../components/FeedPost/FeedPost";
import isEmpty from "../helpers/isEmpty";
import DisplayWrapper from "../layouts/DisplayWrapper/DisplayWrapper";

const Post = ({ UserStore }) => {
  const { post_id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/feed/${post_id}`,
      }).then((res) => setPost(res.post));
    };

    fn();
  }, [post_id]);

  if (isEmpty(post)) return null;

  return (
    <DisplayWrapper>
      <FeedPost post={post} user={UserStore.user} />
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(Post));
