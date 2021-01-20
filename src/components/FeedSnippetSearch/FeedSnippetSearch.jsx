import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { getAxios } from "../../api";
import SearchResults from "../../layouts/SearchResults/SearchResults";
import Search from "../Search/Search";

const FeedSnippetSearch = ({ SearchStore }) => {
  const [results, setResults] = useState([]);

  const queryHandler = (e) => {
    if (e.target.value.length > 3) {
      getAxios({
        url: "/search/snippets",
        params: {
          q: e.target.value,
        },
      }).then((res) => setResults(res));
    } else {
      setResults([]);
    }
  };
  return (
    <Search onChange={queryHandler} placeholder="Search for a snippet">
      {results.length > 0 && (
        <SearchResults>
          {results.map((result) => (
            <div className="flex items-center">
              <p
                className="text-gray-800 font-bold text-lg"
                onClick={() => SearchStore.setPostSnippet(result)}
              >
                {result.name}
              </p>
            </div>
          ))}
        </SearchResults>
      )}
    </Search>
  );
};

export default inject("SearchStore")(observer(FeedSnippetSearch));
