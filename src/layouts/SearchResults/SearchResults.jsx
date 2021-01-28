import React from "react";
import "./SearchResults.css";

const SearchResults = (props) => {
  return (
    <div className="results-wrapper absolute p-4 rounded-lg mt-4 box-shadow z-10">
      {props.children}
    </div>
  );
};

export default SearchResults;
