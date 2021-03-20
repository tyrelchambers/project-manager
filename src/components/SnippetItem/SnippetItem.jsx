import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { getAxios } from "../../api";
import "./SnippetItem.css";
const SnippetItem = ({ snippet, UserStore }) => {
  const deleteHandler = async () => {
    await getAxios({
      url: `/snippets/${snippet.uuid}/delete`,
      method: "delete",
    });
  };
  return (
    <div className="snippet-item rounded-md">
      <div className="flex snippet-item-header relative">
        <div className="flex flex-1 p-3 absolute z-10">
          <Link
            to={`/snippets/${snippet.uuid}`}
            className="font-bold w-full text-xl text-gray-200 truncate"
          >
            {snippet.name}
          </Link>
          {snippet.isGist && (
            <i className="fab fa-github text-pink-500 text-xl"></i>
          )}
        </div>
        <div className="snippet-bg absolute"></div>
      </div>

      <div className="flex justify-between snippet-item-stats items-center p-3">
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <i className="far fa-eye text-gray-300 mr-2"></i>
            <p className="text-gray-300 font-bold">{snippet.views}</p>
          </div>

          <div className="flex items-center">
            <i className="far fa-grin-hearts text-gray-300 mr-2"></i>
            <p className="text-gray-300 font-bold">{snippet.likers.length}</p>
          </div>
        </div>

        {snippet.userId === UserStore.user.uuid && (
          <i
            className="fas fa-trash text-gray-500 ml-6"
            onClick={deleteHandler}
          ></i>
        )}
      </div>
    </div>
  );
};

export default inject("UserStore")(observer(SnippetItem));
