import React, { useEffect, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { H2 } from "../../components/Headings/Headings";
import "./Projects.css";
import ProjectForm from "../../forms/ProjectForm";
import { formatUrl } from "../../helpers/formatUrl";
import ProjectFlags from "../../components/ProjectFlags/ProjectFlags";

const Projects = () => {
  const [state, setState] = useState({
    appName: "",
    framework: {},
    package: {},
  });
  const [flags, setFlags] = useState([]);

  const handleCheck = (obj) => {
    const clone = [...flags];
    const dupe = clone.find((x, id) => {
      return x.flag === obj.flag ? clone.splice(id, 1) : false;
    });

    if (!dupe) {
      clone.push(obj);
    }

    return setFlags(clone);
  };

  const flagElems = flags.map((x) => `${x.flagWithValue()}`);

  return (
    <DisplayWrapper>
      <H2>Project Command Line</H2>
      {state.framework.label && (
        <div className="flex flex-col items-center container p-4 pt-8 pb-8 bg-gray-900 ">
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
              {state.framework.command({ appName: formatUrl(state.appName) })}{" "}
              {flagElems}
            </p>
          </div>
        </div>
      )}
      <div className="flex w-full">
        <ProjectForm state={state} setState={setState} />
        <ProjectFlags
          flagSet={state.framework.framework}
          checkHandler={handleCheck}
        />
      </div>
    </DisplayWrapper>
  );
};

export default Projects;
