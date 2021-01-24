import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import FeedPost from "../../components/FeedPost/FeedPost";
import { H1 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const Bookmarks = ({ ModalStore, UserStore }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (UserStore.user.bookmarks) {
      setBookmarks([...UserStore.user.bookmarks]);
    }
  }, [UserStore.user]);

  const clickhandler = (post) => {
    ModalStore.setRender(
      <FeedPost user={UserStore.user} post={post} isModal={true} />
    );
    ModalStore.setIsOpen(true);
  };

  if (!UserStore.user.bookmarks) return null;

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
              post={bk}
              clickHandler={() => clickhandler(bk)}
            />
          ))}
    </DisplayWrapper>
  );
};

export default inject("ModalStore", "UserStore")(observer(Bookmarks));
