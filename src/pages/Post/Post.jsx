import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAxios } from "../../api";
import FeedPost from "../../components/FeedPost/FeedPost";
import { docWidth } from "../../constants/constants";
import isEmpty from "../../helpers/isEmpty";
import { useUser } from "../../hooks/useUser";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Post.css";

const Post = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState({});
  const userQuery = useUser();

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/feed/${post_id}`,
      }).then(({ success }) => setPost(success.post));
    };

    fn();
  }, [post_id]);

  if (isEmpty(post) || !userQuery.data) return null;

  return (
    <DisplayWrapper>
      <div className="post-wrapper">
        <FeedPost
          post={post}
          user={userQuery.data.user}
          hideOnMobile={false}
          stacked={docWidth}
        />
      </div>
    </DisplayWrapper>
  );
};

export default Post;
