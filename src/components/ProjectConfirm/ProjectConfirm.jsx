import React from "react";
import { formatUrl } from "../../helpers/formatUrl";
const ProjectConfirm = ({ state }) => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-col items-center p-4 pt-8 pb-8 bg-gray-900 ">
        <p className="font-bold text-white text-lg mb-4">
          Use the command terminal
        </p>

        <div className="p-4 bg-gray-800 w-full rounded-lg flex justify-center">
          <p className="text-white flex items-center">
            <span
              className="text-sm text-pink-500 mr-2"
              style={{ userSelect: "none" }}
            >
              ${" "}
            </span>
            {state.framework.command({ appName: formatUrl(state.appName) })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectConfirm;
