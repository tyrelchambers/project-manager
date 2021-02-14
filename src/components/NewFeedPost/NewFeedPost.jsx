import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { getAxios } from "../../api";
import NewFeedPostForm from "../../forms/NewFeedPostForm";
import Avatar from "../Avatar/Avatar";
import SnippetItem from "../SnippetItem/SnippetItem";
import "./NewFeedPost.css";

const NewFeedPost = ({ UserStore, SearchStore }) => {
  const [toggleCode, setToggleSearch] = useState(false);
  const [results, setResults] = useState([]);

  const queryHandler = (e) => {
    getAxios({
      url: "/snippets/me",
    }).then((res) => setResults(res.snippets));
  };

  const addSnippet = (snippet) => {
    SearchStore.setPostSnippet(snippet);
    setToggleSearch(false);
  };

  return (
    <div className="new-feed-post rounded-lg  container max-w-screen-lg mb-16">
      <div className="flex items-center justify-between new-feed-header">
        <div className="flex items-center">
          <Avatar url={UserStore.user.avatar} size="small" />
          <div className="flex flex-col ml-4">
            <p className="text-sm">Posting as:</p>
            <p className="font-bold text-lg">{UserStore.user.name}</p>
          </div>
        </div>
      </div>
      <NewFeedPostForm />
      <div className="feed-post-actions flex flex-col mt-6 flex-1 ">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            setToggleSearch(!toggleCode);
            queryHandler();
          }}
        >
          <i
            class="fas fa-chevron-right mr-4 text-green-500"
            style={{ transform: toggleCode && "rotate(90deg)" }}
          ></i>
          <p>Add a snippet</p>
        </div>
        {toggleCode && (
          <div className="flex flex-wrap">
            {results.map((i, id) => (
              <div
                className="flex items-center bg-gray-900 p-4 rounded-md snippet-item m-2"
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

export default inject("UserStore", "SearchStore")(observer(NewFeedPost));
