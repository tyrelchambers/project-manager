import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getAxios } from "../../api";
import FeedPost from "../../components/FeedPost/FeedPost";
import { docWidth } from "../../constants/constants";
import { useUser } from "../../hooks/useUser";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const userQuery = useUser();

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/feed",
      }).then(({ success }) => {
        if (success.feed) {
          setFeed(success.feed);
        }
      });
    };

    fn();
  }, []);

  if (!userQuery.data) return null;

  return (
    <div className="container max-w-screen-lg">
      {feed.length === 0 && (
        <p className="font-bold text-center">Nothing to show!</p>
      )}

      {feed
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
