import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getAxios } from "../../api";
import NewFeedPostForm from "../../forms/NewFeedPostForm";
import isEmpty from "../../helpers/isEmpty";
import Avatar from "../Avatar/Avatar";
import SnippetItem from "../SnippetItem/SnippetItem";
import "./NewFeedPost.css";
import { useUser } from "../../hooks/useUser";
import { useSnippets } from "../../hooks/useSnippets";

const NewFeedPost = ({ SearchStore, ModalStore }) => {
  const [toggleCode, setToggleSearch] = useState(false);
  const userQuery = useUser();
  const { snippetQuery } = useSnippets();

  const addSnippet = (snippet) => {
    SearchStore.setPostSnippet(snippet);
    setToggleSearch(false);
    ModalStore.setIsOpen(false);
  };

  const SnippetModal = () => {
    return (
      <div className="snippet-list grid grid-cols-2 p-4 gap-4">
        {snippetQuery.data &&
          snippetQuery.data.snippets.map((i, id) => (
            <SnippetItem
              key={id}
              snippet={i}
              clickHandler={() => addSnippet(i)}
            />
          ))}
        {snippetQuery.data && snippetQuery.data.snippets.length === 0 && (
          <p>Looks like you haven't created any snippets</p>
        )}
      </div>
    );
  };

  const clearSnippet = () => {
    SearchStore.setPostSnippet({});
  };

  if (!userQuery.data) return null;

  return (
    <div className="new-feed-post rounded-lg  container max-w-screen-lg mb-16">
      <div className="flex items-center justify-between new-feed-header">
        <div className="flex items-center">
          <Avatar url={userQuery.data.user.avatar} size="small" />
          <div className="flex flex-col ml-4">
            <p className="text-sm">Posting as:</p>
            <p className="font-bold text-lg">{userQuery.data.user.name}</p>
          </div>
        </div>
      </div>
      <NewFeedPostForm user={userQuery.data.user} />
      <div className="feed-post-actions flex flex-col mt-6 flex-1 ">
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer bg-gray-800 w-fit p-2 rounded-md"
            onClick={() => {
              ModalStore.setRender(<SnippetModal />);
              ModalStore.setIsOpen(true);
            }}
          >
            <i className="fas fa-plus-square mr-4 text-gray-400"></i>
            <p>Add snippet</p>
          </div>
          {!isEmpty(SearchStore.postSnippet) && (
            <p className="text-red-500 ml-4" onClick={clearSnippet}>
              Clear snippet
            </p>
          )}
        </div>
        {toggleCode && (
          <div className="flex flex-wrap">
            {snippetQuery.data &&
              snippetQuery.data.snippets.map((i, id) => (
                <div
                  className="flex items-center bg-gray-900 p-4 rounded-md  m-2"
                  onClick={() => addSnippet(i)}
                  key={id}
                >
                  <i className="fas fa-code mr-4 text-pink-500"></i>
                  <p>{i.name}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default inject("SearchStore", "ModalStore")(observer(NewFeedPost));
