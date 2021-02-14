import React from "react";
import { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import { getAxios } from "../api/index";
import { useForm } from "react-hook-form";
import FormError from "../components/FormErrors/FormErrors";
import Code from "../components/Code/Code";
import { H3 } from "../components/Headings/Headings";
import { syntax } from "../constants/syntax";
const SnippetForm = () => {
  const [snippet, setSnippet] = useState({
    name: "",
    snippet: "",
    syntax: "",
  });

  const [qSyntax, setQSyntax] = useState("");

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

  const syntaxes = syntax
    .filter((x) => qSyntax.length > 0 && x.includes(qSyntax))
    .map((x) => (
      <p
        className="mt-1 mb-1 bg-gray-700 p-4 rounded-lg"
        key={x}
        onClick={() => {
          setSnippet({ ...snippet, syntax: x });
          setQSyntax("");
        }}
      >
        {x}
      </p>
    ));

  return (
    <form
      className="bg-gray-800 flex flex-col p-4 w-full container "
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
          rows={10}
        />
      </div>

      <div className="field-group">
        <FormLabel name="syntax" text="Syntax" />
        <input
          type="text"
          name="syntax"
          value={qSyntax}
          className="form-input"
          placeholder="Search for a syntax..."
          onChange={(e) => setQSyntax(e.target.value)}
        />
        <div className="mt-4">{syntaxes}</div>
        {snippet.syntax && (
          <p className="mt-4 text-white">
            <i className="fas fa-chevron-right text-green-500 mr-6"></i>
            {snippet.syntax}
          </p>
        )}
      </div>

      <div className="mb-4">
        <H3>Preview</H3>
        <Code code={snippet.snippet} language={snippet.syntax} />
      </div>

      <MainButton default type="submit">
        Save Snippet
      </MainButton>
    </form>
  );
};

export default SnippetForm;
