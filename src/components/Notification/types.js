import React from "react";

import { Link } from "react-router-dom";

const types = {
  post_like: (id) => (
    <span>
      liked your{" "}
      <Link to={`/post/${id}`} className="font-bold underline">
        post
      </Link>
    </span>
  ),
  follow: "followed you!",
};

export const getType = ({ type, target }) => {
  if (!target) {
    return types[type];
  }
  return types[type](target);
};
