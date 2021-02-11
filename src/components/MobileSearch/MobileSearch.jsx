import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAxios } from "../../api";
import SearchResults from "../../layouts/SearchResults/SearchResults";
import Avatar from "../Avatar/Avatar";
import "./MobileSearch.css";
const MobileSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);

  const queryHandler = (e) => {
    if (e.target.value.length > 2) {
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
    <div className="mobile-search-wrapper">
      <div className="search-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-search text-gray-500"></i>
      </div>

      {isOpen && (
        <div className="mobile-search-body">
          <div
            className="search-close flex items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fas fa-times text-gray-500 mr-4"></i>
          </div>
          <div className="content">
            <div className="content-search flex items-center pl-4 pr-4 pt-2 pb-2 w-full rounded-md">
              <i className="fas fa-search text-gray-500 mr-4"></i>

              <input
                type="search"
                name="search"
                id="search"
                className="bg-transparent w-full outline-none text-white"
                placeholder="Search for a user..."
                onChange={(e) => queryHandler(e)}
                autocomplete="off"
              />
            </div>

            {results.length > 0 && (
              <SearchResults>
                {results.map((result) => (
                  <Link
                    to={`/user/${result.uuid}`}
                    className="flex items-center item-wrapper"
                    onClick={() => setIsOpen(false)}
                  >
                    <Avatar url={result.avatar} className="mr-4" />
                    <p className="text-gray-800 font-bold text-lg">
                      {result.name}
                    </p>
                  </Link>
                ))}
              </SearchResults>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSearch;
