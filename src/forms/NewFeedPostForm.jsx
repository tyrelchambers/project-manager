import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { MainButton } from "../components/Buttons/Buttons";
import { getAxios } from "../api/index";

const NewFeedPostForm = ({ UserStore }) => {
  const [state, setState] = useState({
    post: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!state.post) {
      return;
    }

    getAxios({
      url: "/feed/post",
      method: "post",
      data: {
        post: state.post,
        user: UserStore.user,
      },
    });
  };
  const buttonState = state.post ? (
    <MainButton classes="w-20" default onClick={(e) => submitHandler(e)}>
      Share
    </MainButton>
  ) : (
    <MainButton classes="w-20" muted disabled>
      Share
    </MainButton>
  );
  return (
    <form className="form flex  w-full mt-4">
      <TextareaAutosize
        className="form-input mr-4"
        placeholder="Share a thought or a snippet..."
        maxRows={10}
        onChange={(e) => setState({ ...state, post: e.target.value })}
        value={state.post}
      />

      {buttonState}
    </form>
  );
};

export default inject("UserStore")(observer(NewFeedPostForm));