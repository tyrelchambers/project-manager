import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { MainButton } from "../components/Buttons/Buttons";

const NewFeedPostForm = () => {
  return (
    <form className="form flex  w-full mt-4">
      <TextareaAutosize
        className="form-input mr-4"
        placeholder="Share a thought or a snippet..."
        maxRows={10}
      />
      <MainButton classes="w-20" default>
        Share
      </MainButton>
    </form>
  );
};

export default NewFeedPostForm;
