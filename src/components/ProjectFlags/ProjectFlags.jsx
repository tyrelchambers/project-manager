import React from "react";
import { H3 } from "../Headings/Headings";
import FLAGS from "../../constants/flags";

const ProjectFlags = ({ flagSet, checkHandler, inputHandler }) => {
  const sets = FLAGS[flagSet];

  const el = () => {
    const arr = [];
    for (const key in sets) {
      if (Object.hasOwnProperty.call(sets, key)) {
        const element = sets[key];
        const newEl = (
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-4"
                name={element.flag}
                data-flag={element.flag}
                data-value={element.value}
                onChange={(e) => checkHandler(element)}
              />
              <p className="font-bold">{element.label}</p>
            </div>
            {element.showInputs &&
              document.querySelector(`input[data-flag=${element.flag}`)
                ?.checked && (
                <input
                  type="text"
                  className="form-input mt-2"
                  placeholder="Add value..."
                  data-flag={element.flag}
                  name={`${element.flag}_input`}
                  onChange={(e) => inputHandler(e, element)}
                />
              )}
          </div>
        );

        arr.push(newEl);
      }
    }

    return arr;
  };
  return (
    <div className=" ml-6 w-full">
      <H3>Command line flags</H3>
      <form className="form mt-4 bg-gray-900 p-4 rounded-md">{el()}</form>
    </div>
  );
};

export default ProjectFlags;
