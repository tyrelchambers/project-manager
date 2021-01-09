import React from "react";
import { H3 } from "../Headings/Headings";
import FLAGS from "../../constants/flags";

const ProjectFlags = ({ flagSet, checkHandler }) => {
  const sets = FLAGS[flagSet];

  const el = () => {
    const arr = [];
    for (const key in sets) {
      if (Object.hasOwnProperty.call(sets, key)) {
        const element = sets[key];

        arr.push(
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-4"
              name={element.label}
              data-flag={element.flag}
              data-value={element.value}
              onChange={(e) => checkHandler(element)}
            />
            <p className="font-bold">{element.label}</p>
          </div>
        );
      }
    }

    return arr;
  };
  return (
    <div className=" ml-6 mt-4 w-full">
      <H3>Command line flags</H3>
      <form className="form mt-4 bg-gray-900 p-4 rounded-md">{el()}</form>
    </div>
  );
};

export default ProjectFlags;
