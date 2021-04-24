import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAxios } from "../../api";
import FeedPost from "../../components/FeedPost/FeedPost";
import { docWidth } from "../../constants/constants";
import isEmpty from "../../helpers/isEmpty";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Post.css";

const Post = ({ UserStore }) => {
  const { post_id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/feed/${post_id}`,
      }).then(({ success }) => setPost(success.post));
    };

    fn();
  }, [post_id]);

  if (isEmpty(post)) return null;

  return (
    <DisplayWrapper>
      <div className="post-wrapper">
        <FeedPost
          post={post}
          user={UserStore.user}
          hideOnMobile={false}
          stacked={docWidth}
        />
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(Post));
