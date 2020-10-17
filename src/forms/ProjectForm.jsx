import { inject, observer } from "mobx-react";
import React from "react";
import { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import SelectField from "../components/SelectField/SelectField";
import { frameworks } from "../constants/frameworks";

const ProjectForm = ({ ModalStore, Component }) => {
  const [state, setState] = useState({});
  return (
    <form className="form mt-8">
      <div className="field-group">
        <FormLabel name="projectTitle" text="Project Title" />
        <input
          type="text"
          className="form-input"
          name="projectTitle"
          placeholder="An Awesome Project"
        />
      </div>

      <div className="field-group">
        <FormLabel name="folderName" text="Folder Name" />
        <input
          type="text"
          className="form-input"
          name="folderName"
          placeholder="an-awesome-project"
        />
      </div>

      <div className="mt-8">
        <SelectField data={frameworks} />
      </div>

      <MainButton
        className="mt-8"
        onClick={(e) => {
          e.preventDefault();
          ModalStore.setRender(<Component />);
          ModalStore.setIsOpen(true);
        }}
      >
        Prepare
      </MainButton>
    </form>
  );
};

export default inject("ModalStore")(observer(ProjectForm));
