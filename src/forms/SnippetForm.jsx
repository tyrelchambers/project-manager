import React from "react";
import { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import { getAxios } from "../api/index";

const SnippetForm = () => {
  const [snippet, setSnippet] = useState({
    name: "",
    snippet: "",
  });

  const inputHandler = (e) => {
    setSnippet({ ...snippet, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await getAxios({
      url: "/snippets/save",
      method: "post",
      data: {
        ...snippet,
      },
    }).then((res) => {
      window.location.reload();
    });
  };

  return (
    <form className="bg-gray-800 flex flex-col p-4 w-full">
      <div className="field-group">
        <FormLabel name="name" text="Snippet Name" />

        <input
          type="text"
          name="name"
          placeholder="Authentication Snippet"
          className="form-input"
          onChange={(e) => inputHandler(e)}
          value={snippet.name}
        />
      </div>

      <div className="field-group">
        <FormLabel name="snippet" text="Snippet" />

        <textarea
          type="text"
          name="snippet"
          className="form-input"
          placeholder="Paste code snippet..."
          onChange={(e) => inputHandler(e)}
          value={snippet.snippet}
        />
      </div>

      <MainButton default onClick={(e) => submitHandler(e)}>
        Save Snippet
      </MainButton>
    </form>
  );
};

export default SnippetForm;
