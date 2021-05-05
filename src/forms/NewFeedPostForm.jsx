import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { MainButton } from "../components/Buttons/Buttons";
import { getAxios } from "../api/index";
import Code from "../components/Code/Code";
import isEmpty from "../helpers/isEmpty";
import "./forms.css";
const NewFeedPostForm = ({ UserStore, SearchStore }) => {
  const [state, setState] = useState({
    post: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!state.post) {
      return;
    }

    await getAxios({
      url: "/feed/post",
      method: "post",
      data: {
        post: state.post,
        user: UserStore.user,
        attached: {
          snippet: SearchStore.postSnippet.uuid,
        },
      },
    });

    window.location.reload();
  };
  const buttonState = state.post ? (
    <MainButton default onClick={(e) => submitHandler(e)}>
      Share
    </MainButton>
  ) : (
    <MainButton muted disabled>
      Share
    </MainButton>
  );
  return (
    <form className="form flex flex-col w-full mt-4">
      <div className="flex items-center w-full mobile-column">
        <TextareaAutosize
          className="form-input mr-4"
          placeholder="Share a thought or a snippet..."
          maxRows={10}
          onChange={(e) => setState({ ...state, post: e.target.value })}
          value={state.post}
        />

        <div className="max-w-xl">{buttonState}</div>
      </div>

      {!isEmpty(SearchStore.postSnippet) && (
        <div
          className="attached-snippet mt-4"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          <Code
            language={SearchStore.postSnippet.syntax}
            code={SearchStore.postSnippet.snippet}
          />
        </div>
      )}
    </form>
  );
};

export default inject("UserStore", "SearchStore")(observer(NewFeedPostForm));
