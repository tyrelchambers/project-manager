import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getAxios } from "../../api";
import { MainButton } from "../../components/Buttons/Buttons";
import { H1, H3 } from "../../components/Headings/Headings";
import { copyToClipboard } from "../../helpers/copyToClipboard";
import isEmpty from "../../helpers/isEmpty";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import SnippetStats from "../../components/SnippetStats/SnippetStats";
import { inject, observer } from "mobx-react";
import ShareSnippetModal from "../../modals/ShareSnippetModal/ShareSnippetModal";
import Code from "../../components/Code/Code";
import Status from "../../components/Status/Status";
import "./SnippetShow.css";
import { config } from "../../config/config";

const SnippetShow = ({ UserStore, ModalStore }) => {
  const { snippet_uuid } = useParams();
  const [snippet, setSnippet] = useState({});
  const history = useHistory();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/snippets/${snippet_uuid}`,
      }).then((res) => {
        setSnippet(res.snippet);
      });
    };

    fn();
  }, []);

  useEffect(() => {
    if (!isEmpty(snippet)) {
      for (let i = 0; i < snippet.likers.length; i++) {
        snippet.likers[i].uuid === UserStore.user.uuid
          ? setLiked(true)
          : setLiked(false);
      }
    }
  }, [snippet]);

  if (isEmpty(snippet)) return null;

  const deleteHandler = async () => {
    await getAxios({
      url: `/snippets/${snippet_uuid}/delete`,
      method: "delete",
    }).then((res) => {
      history.push("/snippets");
    });
  };

  const likeHandler = async () => {
    await getAxios({
      url: `/snippets/${snippet_uuid}/like`,
      method: "post",
    });

    setLiked(true);
  };

  const dislikeHandler = async () => {
    await getAxios({
      url: `/snippets/${snippet_uuid}/dislike`,
      method: "post",
    });
    setLiked(false);
  };

  return (
    <DisplayWrapper>
      <div className="flex flex-col">
        <H1 className="mr-4">{snippet.name}</H1>

        <div className="mt-6 mb-6 flex">
          {liked ? (
            <i
              className="fas fa-heart text-red-500"
              onClick={dislikeHandler}
            ></i>
          ) : (
            <i className="far fa-heart text-gray-500" onClick={likeHandler}></i>
          )}
          {UserStore.user.uuid === snippet.userId && (
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
            {snippet.description}
          </pre>

          <H3 className="mt-6">Snippet</H3>

          <Code language={snippet.syntax} code={snippet.snippet} />
        </div>
        <div className="w-2/5">
          <H3 className="mb-4">Options</H3>

          {!snippet.visibility && (
            <Status text="Hidden from others" wrapperClass="bg-red-700" />
          )}

          {snippet.visibility && (
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

            {snippet.visibility ? (
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

          {UserStore.user.uuid === snippet.userId && (
            <MainButton
              default
              classes="mt-2"
              onClick={() => history.push(`/snippets/${snippet.uuid}/edit`)}
            >
              Edit
            </MainButton>
          )}

          <SnippetStats stats={snippet} />
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore", "ModalStore")(observer(SnippetShow));
