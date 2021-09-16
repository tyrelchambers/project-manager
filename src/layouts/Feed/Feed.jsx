import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getAxios } from "../../api";
import FeedPost from "../../components/FeedPost/FeedPost";
import { docWidth } from "../../constants/constants";
import { useGetPosts } from "../../hooks/useGetPosts";
import { useUser } from "../../hooks/useUser";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const userQuery = useUser();
  const postQuery = useGetPosts();

  if (!userQuery.data) return null;

  return (
    <div className="container max-w-screen-lg">
      {postQuery.data && postQuery.data.feed.length === 0 && (
        <p className="font-bold text-center">Nothing to show!</p>
      )}

      {postQuery.data &&
        postQuery.data.feed
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          .map((post) => (
            <FeedPost
              user={userQuery.data.user}
              key={post.uuid}
              post={post}
              stacked={docWidth}
            />
          ))}
    </div>
  );
};

export default Feed;
