import React, { useReducer, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { H1, H2Subtitle } from "../../components/Headings/Headings";
import "./Projects.css";
import ProjectForm from "../../forms/ProjectForm";
import ProjectFlags from "../../components/ProjectFlags/ProjectFlags";
import { copyToClipboard } from "../../helpers/copyToClipboard";
import flagReducer from "../../reducers/flagReducer";
import FLAGS from "../../constants/flags";

const Projects = () => {
  const [state, setState] = useState({
    appName: "",
    framework: {},
    package: {},
  });
  const [flags, dispatch] = useReducer(flagReducer, []);

  const handleCheck = (obj) => {
    return dispatch({
      type: "add-flag",
      payload: {
        obj,
      },
    });
  };

  const flagElems = flags.map((x) => `${x.flagWithValue()} `);

  const inputHandler = (e, obj) => {
    dispatch({
      type: "add-value",
      payload: {
        ...obj,
        flag: e.target.dataset.flag,
        value: e.target.value,
      },
    });
  };

  return (
    <DisplayWrapper>
      <H1>Project Command Line</H1>
      <H2Subtitle>
        Structure a CLI command to build your next project. Just give it a name,
        select a framework, select any flags, and build away.
      </H2Subtitle>
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
              <span>
                {
                  <Command
                    state={state}
                    flagElems={flagElems}
                    parentFlagSet={FLAGS[state.framework.framework]}
                  />
                }
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
      <div className="flex container mt-8 projects-options">
        <ProjectForm state={state} setState={setState} />
        <ProjectFlags
          flagSet={state.framework.framework}
          checkHandler={handleCheck}
          inputHandler={inputHandler}
        />
      </div>
    </DisplayWrapper>
  );
};

const Command = ({ state, flagElems, parentFlagSet }) => {
  const { optionsBeforeName } = parentFlagSet;

  let str = `${state.framework.install}`;

  if (optionsBeforeName) {
    str += ` ${flagElems} ${state.appName}`;
  } else {
    str += ` ${state.appName} ${flagElems}`;
  }
  return <p id="command">{str.replace(/,/gi, "")}</p>;
};

export default Projects;
