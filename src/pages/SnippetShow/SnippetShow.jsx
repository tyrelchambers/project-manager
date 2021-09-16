import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { MainButton } from "../../components/Buttons/Buttons";
import { H1, H3 } from "../../components/Headings/Headings";
import { copyToClipboard } from "../../helpers/copyToClipboard";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import SnippetStats from "../../components/SnippetStats/SnippetStats";
import { inject, observer } from "mobx-react";
import ShareSnippetModal from "../../modals/ShareSnippetModal/ShareSnippetModal";
import Code from "../../components/Code/Code";
import Status from "../../components/Status/Status";
import "./SnippetShow.css";
import { config } from "../../config/config";
import { useUser } from "../../hooks/useUser";
import { useSnippet } from "../../hooks/useSnippet";
import { deleteSnippet } from "../../api/deleteSnippet";
import { likeSnippet } from "../../api/likeSnippet";
import { dislikeSnippet } from "../../api/dislikeSnippet";

const SnippetShow = ({ ModalStore }) => {
  const { snippet_uuid } = useParams();
  const history = useHistory();
  const [liked, setLiked] = useState(false);
  const userQuery = useUser();
  const snippet = useSnippet(snippet_uuid);

  useEffect(() => {
    if (snippet.data?.snippet) {
      for (let i = 0; i < snippet.data.snippet.likers.length; i++) {
        snippet.data.snippet.likers[i].uuid === userQuery.data.user.uuid
          ? setLiked(true)
          : setLiked(false);
      }
    }
  }, [snippet]);

  if (!snippet.data || !userQuery.data) return null;

  const deleteHandler = async () => {
    deleteSnippet(snippet_uuid);
    history.push("/snippets");
  };

  const likeHandler = async () => {
    likeSnippet(snippet_uuid);

    setLiked(true);
  };

  const dislikeHandler = async () => {
    dislikeSnippet(snippet_uuid);
    setLiked(false);
  };

  return (
    <DisplayWrapper>
      <div className="flex flex-col">
        <H1 className="mr-4">{snippet.data.snippet.name}</H1>

        <div className="mt-6 mb-6 flex">
          {liked ? (
            <i
              className="fas fa-heart text-red-500"
              onClick={dislikeHandler}
            ></i>
          ) : (
            <i className="far fa-heart text-gray-500" onClick={likeHandler}></i>
          )}
          {userQuery.data.user.uuid === snippet.data.snippet.userId && (
            <i
              className="fas fa-trash text-red-500 ml-6"
              onClick={deleteHandler}
            ></i>
          )}
        </div>
      </div>

      <div className="flex  mb-4 mt-4 snippet-show-body">
        <div
          className="w-3/5 rounded-lg flex flex-col mr-4"
          style={{ height: "fit-content" }}
        >
          <H3>Description</H3>
          <pre className="whitespace-pre-wrap pre text-gray-500 mt-2 max-w-screen-sm">
            {snippet.data.snippet.description}
          </pre>

          <H3 className="mt-6">Snippet</H3>

          <Code
            language={snippet.data.snippet.syntax}
            code={snippet.data.snippet.snippet}
          />
        </div>
        <div className="w-2/5">
          <H3 className="mb-4">Options</H3>

          {!snippet.data.snippet.visibility && (
            <Status text="Hidden from others" wrapperClass="bg-red-700" />
          )}

          {snippet.data.snippet.visibility && (
            <Status text="Can be seen by others" wrapperClass="bg-green-500" />
          )}

          <div className="flex items-center mt-4 snippet-actions">
            <MainButton
              className="m-2"
              muted
              onClick={() => {
                copyToClipboard(snippet.snippet);
              }}
            >
              Copy to Clipboard
            </MainButton>

            {snippet.data.snippet.visibility ? (
              <MainButton
                muted
                classes="m-2"
                onClick={() => {
                  ModalStore.setRender(
                    <ShareSnippetModal
                      shareLink={`${
                        config[process.env.NODE_ENV].backend
                      }/snippets/${snippet_uuid}`}
                      snippet={snippet}
                    />
                  );
                  ModalStore.setIsOpen(true);
                }}
              >
                Share
              </MainButton>
            ) : (
              <MainButton muted classes="m-2" disabled>
                Can't share: Snippet isn't public
              </MainButton>
            )}
          </div>

          {userQuery.data.user.uuid === snippet.data.snippet.userId && (
            <MainButton
              default
              classes="mt-2"
              onClick={() => history.push(`/snippets/${snippet.uuid}/edit`)}
            >
              Edit
            </MainButton>
          )}

          <SnippetStats stats={snippet.data.snippet} />
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default inject("ModalStore")(observer(SnippetShow));
