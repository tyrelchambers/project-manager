import React from "react";
import { Link } from "react-router-dom";
import { formatUrl } from "../../helpers/formatUrl";

const GistItem = ({ gist, clickHandler }) => {
  const g = Object.keys(gist);
  const item = gist[g];
  console.log(item);
  return (
    <Link
      className="flex items-center bg-gray-900 p-4 rounded-md snippet-item m-2"
      to={`/snippets/${formatUrl(item.filename)}`}
      onClick={clickHandler}
    >
      <i className="fab fa-github mr-4 text-pink-500"></i>
      <p>{item.filename}</p>
    </Link>
  );
};

export default GistItem;
