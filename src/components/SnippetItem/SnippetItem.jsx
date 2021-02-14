import React from "react";
import { Link } from "react-router-dom";

const SnippetItem = ({ snippet, clickHandler }) => {
  return (
    <Link
      className="flex items-center bg-gray-900 p-4 rounded-md snippet-item m-2"
      to={`/snippets/${snippet.uuid}`}
      onClick={clickHandler}
    >
      <i className="fas fa-code mr-4 text-pink-500"></i>
      <p>{snippet.name}</p>
    </Link>
  );
};

export default SnippetItem;
