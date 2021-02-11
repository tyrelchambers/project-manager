import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getAxios } from "../../api";
import { H1 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./SnippetEdit.css";
import FormLabel from "../../components/FormLabel/FormLabel";
import { MainButton } from "../../components/Buttons/Buttons";

const SnippetEdit = () => {
  const { snippet_uuid } = useParams();
  const [snippet, setSnippet] = useState({});
  const [updated, setUpdated] = useState({});
  const history = useHistory();
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

  const submitHandler = async (e) => {
    e.preventDefault();

    await getAxios({
      url: `/snippets/${snippet.uuid}/edit`,
      method: "patch",
      data: updated,
    });

    window.location.pathname = `/snippets/${snippet.uuid}`;
  };

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
        <MainButton default onClick={(e) => submitHandler(e)}>
          Save changes
        </MainButton>
      </form>
    </DisplayWrapper>
  );
};

export default SnippetEdit;
