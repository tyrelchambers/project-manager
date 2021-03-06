import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getAxios } from "../../api";
import FeedPost from "../../components/FeedPost/FeedPost";
import { H1 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const Bookmarks = ({ UserStore }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/bookmarks",
      }).then(({ success }) => setBookmarks(success.bookmarks));
    };
    fn();
  }, []);

  return (
    <DisplayWrapper>
      <H1>My Bookmarks</H1>

      {bookmarks.length === 0 && (
        <p className="font-bold mt-8">No saved bookmarks</p>
      )}

      {bookmarks.length > 0 &&
        bookmarks
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          .map((bk) => (
            <FeedPost
              user={UserStore.user}
              key={bk.id}
              post={bk.FeedPost}
              isBookmarked
            />
          ))}
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(Bookmarks));
