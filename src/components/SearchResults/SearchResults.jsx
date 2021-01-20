import React from "react";
import Avatar from "../Avatar/Avatar";
import "./SearchResults.css";

const SearchResults = ({ results }) => {
  return (
    <div className="results-wrapper absolute p-4 rounded-lg mt-4 box-shadow">
      {results.map((result) => (
        <div className="flex items-center">
          <Avatar url={result.avatar} className="mr-4" />
          <p className="text-gray-800 font-bold text-lg">{result.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
