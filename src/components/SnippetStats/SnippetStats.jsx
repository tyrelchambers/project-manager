import React from "react";
import Status from "../Status/Status";

const SnippetStats = ({ stats }) => {
  return (
    <div className="flex mt-6 mb-6">
      <div className="flex items-center mr-4 ">
        <Status
          text={`${stats.views} people have seen your code`}
          wrapperClass="bg-gray-900"
          icon={<i className="far fa-eye text-white mr-2"></i>}
        />
      </div>

      <div className="flex items-center mr-4">
        <Status
          text={`${stats.likers.length} like your code`}
          icon={<i className="far fa-grin-hearts text-white mr-2"></i>}
          wrapperClass="bg-gray-900"
        />
      </div>
    </div>
  );
};

export default SnippetStats;
