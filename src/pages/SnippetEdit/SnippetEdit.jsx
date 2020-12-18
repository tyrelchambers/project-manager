import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getAxios } from "../../api";
import { H2 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./SnippetEdit.css";
import FormLabel from "../../components/FormLabel/FormLabel";
import { MainButton } from "../../components/Buttons/Buttons";

const SnippetEdit = () => {
  const { snippet_id } = useParams();
  const [snippet, setSnippet] = useState({});
  const [updated, setUpdated] = useState({});
  const history = useHistory();
  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/snippets/${snippet_id}`,
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

    history.push(`/snippets/${snippet.uuid}`);
  };

  return (
    <DisplayWrapper>
      <H2>Editing {snippet.name}</H2>
      <form action="" className="form">
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
        <MainButton default onClick={(e) => submitHandler(e)}>
          Save changes
        </MainButton>
      </form>
    </DisplayWrapper>
  );
};

export default SnippetEdit;
