import React from "react";

const SnippetStats = ({ stats }) => {
  return (
    <div className="flex mt-6 mb-6">
      <div className="flex items-center mr-4 ">
        <i className="far fa-eye text-white mr-2"></i>
        <p className="text-gray-500">{stats.views}</p>
      </div>

      <div className="flex items-center mr-4">
        <i className="far fa-grin-hearts text-white mr-2"></i>
        <p className="text-gray-500">{stats.likers.length}</p>
      </div>

      <div className="flex items-center mr-4">
        <i className="fas fa-share text-white mr-2"></i>
        <p className="text-gray-500">{stats.shares}</p>
      </div>
    </div>
  );
};

export default SnippetStats;
