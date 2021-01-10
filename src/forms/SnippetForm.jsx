import React from "react";
import { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import { getAxios } from "../api/index";
import { useForm } from "react-hook-form";
import FormError from "../components/FormErrors/FormErrors";

const SnippetForm = () => {
  const [snippet, setSnippet] = useState({
    name: "",
    snippet: "",
  });

  const { handleSubmit, errors, register, setError } = useForm({
    reValidateMode: "onSubmit",
  });

  const inputHandler = (e) => {
    setSnippet({ ...snippet, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    if (!snippet.name.trim()) {
      return setError("name", {
        type: "manual",
        message: "Still need a name",
      });
    }
    await getAxios({
      url: "/snippets/save",
      method: "post",
      data: {
        ...snippet,
      },
    }).then((res) => {
      if (res) {
        window.location.reload();
      }
    });
  };

  return (
    <form
      className="bg-gray-800 flex flex-col p-4 w-full container"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="field-group">
        <FormLabel name="name" text="Snippet Name" />

        <input
          type="text"
          name="name"
          placeholder="Name your snippet"
          className="form-input"
          onChange={(e) => inputHandler(e)}
          value={snippet.name}
          ref={register({
            required: {
              value: true,
              message: "We need a name for your snippet",
            },
          })}
        />
        <FormError error={errors.name} />
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

      <MainButton default type="submit">
        Save Snippet
      </MainButton>
    </form>
  );
};

export default SnippetForm;
