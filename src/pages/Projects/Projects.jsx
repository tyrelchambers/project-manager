import React, { useEffect, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { H2 } from "../../components/Headings/Headings";
import "./Projects.css";
import ProjectForm from "../../forms/ProjectForm";
import { formatUrl } from "../../helpers/formatUrl";
import ProjectFlags from "../../components/ProjectFlags/ProjectFlags";
import { copyToClipboard } from "../../helpers/copyToClipboard";

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
      <div className="container mt-8 ">
        <div className="bg-gray-900 w-full rounded-lg flex justify-between">
          <p className="text-white flex items-center p-4 ">
            <span
              className="text-sm text-pink-500 mr-2"
              style={{ userSelect: "none" }}
            >
              ${" "}
            </span>
            {state.framework.label && (
              <span id="command">
                {state.framework.command({
                  appName: formatUrl(state.appName),
                })}{" "}
                {flagElems}{" "}
              </span>
            )}
          </p>
          {state.framework.label && (
            <div
              className="bg-pink-500 p-4 rounded-r-md"
              onClick={() =>
                copyToClipboard(document.querySelector("#command").innerHTML)
              }
            >
              <i className="fas fa-clipboard text-white"></i>
            </div>
          )}
        </div>
      </div>
      <div className="flex container">
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
