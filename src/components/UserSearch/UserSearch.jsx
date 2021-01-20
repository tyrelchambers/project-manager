import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { getAxios } from "../../api";
import Search from "../Search/Search";
import SearchResults from "../SearchResults/SearchResults";

const UserSearch = ({ SearchStore }) => {
  const [results, setResults] = useState([]);

  const queryHandler = (e) => {
    if (e.target.value.length > 3) {
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
    <Search onChange={queryHandler}>
      {results.length > 0 && <SearchResults results={results} />}
    </Search>
  );
};

export default inject("SearchStore")(observer(UserSearch));
