import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getAxios } from "../../api";
import FeedPost from "../../components/FeedPost/FeedPost";

const Feed = ({ ModalStore }) => {
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

  const clickhandler = (post) => {
    ModalStore.setRender(<FeedPost post={post} isModal={true} />);
    ModalStore.setIsOpen(true);
  };
  return (
    <div className="container max-w-screen-lg">
      {feed.length === 0 && (
        <p className="font-bold text-center">Nothing to show!</p>
      )}
      {feed
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        .map((post) => (
          <FeedPost post={post} clickHandler={() => clickhandler(post)} />
        ))}
    </div>
  );
};

export default inject("ModalStore")(observer(Feed));
