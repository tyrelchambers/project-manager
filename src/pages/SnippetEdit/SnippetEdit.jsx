import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAxios } from "../../api";
import { H1, H3 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./SnippetEdit.css";
import FormLabel from "../../components/FormLabel/FormLabel";
import { MainButton } from "../../components/Buttons/Buttons";
import Code from "../../components/Code/Code";
import { syntax } from "../../constants/syntax";
import isEmpty from "../../helpers/isEmpty";

const SnippetEdit = () => {
  const { snippet_uuid } = useParams();
  const [snippet, setSnippet] = useState({});
  const [updated, setUpdated] = useState({});
  const [qSyntax, setQSyntax] = useState("");

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/snippets/${snippet_uuid}`,
      }).then((res) => {
        setSnippet(res.snippet);
        setUpdated(res.snippet);
      });
    };

    fn();
  }, []);

  if (isEmpty(snippet)) return null;

  const submitHandler = async (e) => {
    e.preventDefault();

    await getAxios({
      url: `/snippets/${snippet.uuid}/edit`,
      method: "patch",
      data: updated,
    });

    window.location.pathname = `/snippets/${snippet.uuid}`;
  };

  const syntaxes = syntax
    .filter((x) => qSyntax.length > 0 && x.includes(qSyntax))
    .map((x) => (
      <p
        className="mt-1 mb-1 bg-gray-700 p-4 rounded-lg"
        key={x}
        onClick={() => {
          setUpdated({ ...updated, syntax: x });
          setSnippet({ ...snippet, syntax: x });

          setQSyntax("");
        }}
      >
        {x}
      </p>
    ));

  return (
    <DisplayWrapper>
      <H1>Editing {snippet.name}</H1>
      <form className="form container max-w-screen-md">
        <div className="field-group mt-6">
          <FormLabel name="name" text="Snippet Name" />

          <input
            type="text"
            name="name"
            placeholder="Authentication Snippet"
            className="form-input"
            onChange={(e) => setUpdated({ ...updated, name: e.target.value })}
            value={updated.name}
          />
        </div>
        <div className="field-group mt-6">
          <FormLabel text="Snippet" />
          <textarea
            type="text"
            name="snippet"
            className="form-input"
            placeholder="Paste code snippet..."
            onChange={(e) =>
              setUpdated({ ...updated, snippet: e.target.value })
            }
            value={updated.snippet}
            rows={10}
          />
        </div>

        <div className="flex flex-col mt-4 mb-4">
          <FormLabel name="visibility" text="Visibility" />
          <div className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value="Public"
              onChange={(e) => setUpdated({ ...updated, visibility: true })}
              checked={updated.visibility}
            />
            <p className="ml-4 ">Public</p>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value="Private"
              onChange={(e) => setUpdated({ ...updated, visibility: false })}
              checked={!updated.visibility}
            />
            <p className="ml-4 ">Private</p>
          </div>
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

        <MainButton default onClick={(e) => submitHandler(e)}>
          Save changes
        </MainButton>
      </form>
    </DisplayWrapper>
  );
};

export default SnippetEdit;
