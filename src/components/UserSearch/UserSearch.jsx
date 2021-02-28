import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAxios } from "../../api";
import SearchResults from "../../layouts/SearchResults/SearchResults";
import Avatar from "../Avatar/Avatar";
import Search from "../Search/Search";

const UserSearch = () => {
  const [results, setResults] = useState([]);

  const queryHandler = (e) => {
    if (e.target.value.length > 0) {
      getAxios({
        url: "/search/users",
        params: {
          q: e.target.value,
        },
      }).then((res) => setResults(res));
    } else {
      setResults([]);
    }
  };
  return (
    <Search onChange={queryHandler} placeholder="Search users...">
      {results.length > 0 && (
        <SearchResults>
          {results.map((result) => (
            <Link
              to={`/user/${result.uuid}`}
              className="flex items-center item-wrapper"
            >
              <Avatar url={result.avatar} className="mr-4" size="small" />
              <p className="text-gray-800 font-bold text-lg truncate">
                {result.name || result.email}
              </p>
            </Link>
          ))}
        </SearchResults>
      )}
    </Search>
  );
};

export default UserSearch;
