import React, { useEffect, useState } from "react";
import { getAxios } from "../../api";
import FeedPost from "../../components/FeedPost/FeedPost";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/feed",
      }).then((res) => {
        if (res.feed) {
          setFeed(res.feed);
        }
      });
    };

    fn();
  }, []);
  return (
    <div className="container max-w-screen-lg">
      {feed.length === 0 && (
        <p className="font-bold text-center">Nothing to show!</p>
      )}
      {feed.map((post) => (
        <FeedPost post={post} />
      ))}
    </div>
  );
};

export default Feed;
