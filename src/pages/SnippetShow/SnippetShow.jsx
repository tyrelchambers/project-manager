import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getAxios } from "../../api";
import { MainButton } from "../../components/Buttons/Buttons";
import { H2 } from "../../components/Headings/Headings";
import { copyToClipboard } from "../../helpers/copyToClipboard";
import isEmpty from "../../helpers/isEmpty";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const SnippetShow = () => {
  const { snippet_id } = useParams();
  const [snippet, setSnippet] = useState({});
  const history = useHistory();
  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/snippets/${snippet_id}`,
      }).then((res) => {
        setSnippet(res.snippet);
      });
    };

    fn();
  }, []);

  if (isEmpty(snippet)) return null;

  const deleteHandler = async () => {
    await getAxios({
      url: `/snippets/${snippet_id}/delete`,
      method: "delete",
    }).then((res) => {
      history.goBack();
    });
  };

  return (
    <DisplayWrapper>
      <div className="flex items-center">
        <H2 className="mr-4">{snippet.name}</H2>
        <i className="fas fa-trash text-red-500" onClick={deleteHandler}></i>
      </div>
      <div className="p-4 bg-gray-800 w-3/5 rounded-lg flex flex-col mb-4 mt-4">
        <pre>
          <code className="text-gray-300">{snippet.snippet}</code>
        </pre>
        <MainButton
          classes="mt-8"
          onClick={() => copyToClipboard(snippet.snippet)}
        >
          Copy to Clipboard
        </MainButton>
      </div>
    </DisplayWrapper>
  );
};

export default SnippetShow;
