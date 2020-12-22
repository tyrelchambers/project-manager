import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getAxios } from "../../api";
import { MainButton } from "../../components/Buttons/Buttons";
import { H2, H3 } from "../../components/Headings/Headings";
import { copyToClipboard } from "../../helpers/copyToClipboard";
import isEmpty from "../../helpers/isEmpty";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import SnippetStats from "../../components/SnippetStats/SnippetStats";
import { inject, observer } from "mobx-react";
import ShareSnippetModal from "../../modals/ShareSnippetModal/ShareSnippetModal";

const SnippetShow = ({ UserStore, ModalStore }) => {
  const { snippet_id } = useParams();
  const [snippet, setSnippet] = useState({});
  const history = useHistory();
  const [liked, setLiked] = useState(false);

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
      url: `/snippets/${snippet_id}/delete`,
      method: "delete",
    }).then((res) => {
      history.goBack();
    });
  };

  const likeHandler = async () => {
    await getAxios({
      url: `/snippets/${snippet_id}/like`,
      method: "post",
    });

    setLiked(true);
  };

  const dislikeHandler = async () => {
    await getAxios({
      url: `/snippets/${snippet_id}/dislike`,
      method: "post",
    });
    setLiked(false);
  };

  return (
    <DisplayWrapper>
      <div className="flex items-center">
        <div className="mr-4">
          {liked ? (
            <i
              className="fas fa-heart text-red-500"
              onClick={dislikeHandler}
            ></i>
          ) : (
            <i className="far fa-heart text-gray-500" onClick={likeHandler}></i>
          )}
        </div>
        <H2 className="mr-4">{snippet.name}</H2>
        <i className="fas fa-trash text-red-500" onClick={deleteHandler}></i>
      </div>
      <SnippetStats stats={snippet} />
      <div className="flex  mb-4 mt-4">
        <div
          className="p-4 bg-gray-800 w-3/5 rounded-lg flex flex-col mr-4"
          style={{ height: "fit-content" }}
        >
          <pre>
            <code className="text-gray-300">{snippet.snippet}</code>
          </pre>
        </div>
        <div className="w-2/5">
          <H3>Options</H3>

          <p className="mt-4 mb-4">
            <span className="font-bold">Visibility:</span> Private
          </p>
          <div className="flex items-center">
            <MainButton
              className="m-2"
              muted
              onClick={() => {
                copyToClipboard(snippet.snippet);
              }}
            >
              Copy to Clipboard
            </MainButton>

            <MainButton
              muted
              classes="m-2"
              onClick={() => {
                ModalStore.setRender(
                  <ShareSnippetModal
                    shareLink={`${process.env.REACT_APP_CLIENT}/snippets/${snippet_id}`}
                    snippet={snippet}
                  />
                );
                ModalStore.setIsOpen(true);
              }}
            >
              Share
            </MainButton>
          </div>

          <MainButton
            default
            classes="mt-2"
            onClick={() => history.push(`/snippets/${snippet.uuid}/edit`)}
          >
            Edit
          </MainButton>
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore", "ModalStore")(observer(SnippetShow));
