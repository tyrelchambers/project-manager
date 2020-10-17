import React from "react";
import { useState } from "react";
import { MainButton } from "../../components/Buttons/Buttons";
import { H2 } from "../../components/Headings/Headings";
import Spinner from "../../components/Spinner/Spinner";
import ProjectForm from "../../forms/ProjectForm";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const NewProject = () => {
  const [downloading, setDownloading] = useState(false);
  const [state, setState] = useState({
    projectTitle: "",
    folderName: "",
    framework: {},
  });

  const submitHandler = () => {
    console.log(state);
  };

  const FinalScreen = () => (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-col items-center p-4 pt-8 pb-8">
        <p className="font-bold text-lg mb-4">Download your project files</p>

        {downloading && (
          <div className="flex items-center mt-4">
            <Spinner />
            <p className="text-pink-500 font-bold ml-4">Preparing files...</p>
          </div>
        )}

        {!downloading && (
          <MainButton>
            <i className="fas fa-cloud-download-alt mr-4 "></i>Download
          </MainButton>
        )}
      </div>
      <div className="flex flex-col items-center p-4 pt-8 pb-8 bg-gray-900 ">
        <p className="font-bold text-white text-lg mb-4">
          Use the command terminal
        </p>

        <div className="p-4 bg-gray-800 w-full rounded-md flex justify-center">
          <p className="text-white flex items-center">
            <span
              className="text-sm text-pink-500 mr-2"
              style={{ userSelect: "none" }}
            >
              ${" "}
            </span>
            {state.framework.command({ folderName: state.folderName })}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <DisplayWrapper>
      <H2>New Project</H2>
      <ProjectForm
        Component={FinalScreen}
        state={state}
        setState={setState}
        submitHandler={submitHandler}
      />
    </DisplayWrapper>
  );
};

export default NewProject;
