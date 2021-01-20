import React from "react";
import "./Search.css";

const Search = ({ onChange, children }) => {
  return (
    <div className="search-wrapper relative">
      <div className="flex items-center pl-4 pr-4 pt-2 pb-2 w-full bg-gray-700 rounded-md">
        <i class="fas fa-search mr-4 text-white"></i>
        <input
          type="search"
          name="search"
          id="search"
          className="bg-transparent w-full outline-none text-white"
          placeholder="Search users..."
          onChange={onChange}
        />
      </div>

      {children}
    </div>
  );
};

export default Search;
