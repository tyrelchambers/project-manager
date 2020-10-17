import { inject, observer } from "mobx-react";
import React from "react";
import { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import SelectField from "../components/SelectField/SelectField";
import { frameworks } from "../constants/frameworks";

const ProjectForm = ({
  ModalStore,
  Component,
  state,
  setState,
  submitHandler,
}) => {
  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form className="form mt-8">
      <div className="field-group">
        <FormLabel name="projectTitle" text="Project Title" />
        <input
          type="text"
          className="form-input"
          name="projectTitle"
          placeholder="An Awesome Project"
          value={state.projectTitle}
          onChange={(e) => inputHandler(e)}
        />
      </div>

      <div className="field-group">
        <FormLabel name="folderName" text="Folder Name" />
        <input
          type="text"
          className="form-input"
          name="folderName"
          placeholder="an-awesome-project"
          value={state.folderName}
          onChange={(e) => inputHandler(e)}
        />
      </div>

      <div className="mt-8">
        <SelectField data={frameworks} stateHandler={setState} state={state} />
      </div>

      <MainButton
        className="mt-8"
        onClick={(e) => {
          e.preventDefault();
          submitHandler();
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
