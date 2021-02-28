import React from "react";
import { H1 } from "../../components/Headings/Headings";
import SnippetForm from "../../forms/SnippetForm";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const NewSnippet = () => {
  return (
    <DisplayWrapper>
      <H1>New Snippet</H1>
      <SnippetForm />
    </DisplayWrapper>
  );
};

export default NewSnippet;
