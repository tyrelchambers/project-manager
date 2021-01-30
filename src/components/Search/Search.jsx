import React from "react";
import "./Search.css";

const Search = ({ onChange, customIcon, children, placeholder }) => {
  const icon = customIcon ? (
    <i className={`mr-4 text-white ${customIcon}`}></i>
  ) : (
    <i className="fas fa-search mr-4 text-white"></i>
  );

  return (
    <div className="search-wrapper relative">
      <div className="flex items-center pl-4 pr-4 pt-2 pb-2 w-full bg-gray-700 rounded-md">
        {icon}
        <input
          type="search"
          name="search"
          id="search"
          className="bg-transparent w-full outline-none text-white"
          placeholder={placeholder}
          onChange={onChange}
          autocomplete="off"
        />
      </div>

      {children}
    </div>
  );
};

export default Search;
