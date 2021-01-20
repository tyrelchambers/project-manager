import React from "react";
import "./Search.css";

const Search = () => {
  return (
    <div className="search-wrapper flex items-center bg-gray-700 pl-4 pr-4 rounded-md">
      <i class="fas fa-search mr-4 text-white"></i>
      <input
        type="search"
        name="search"
        id="search"
        className="bg-transparent w-full outline-none text-white"
        placeholder="Search users..."
      />
    </div>
  );
};

export default Search;
