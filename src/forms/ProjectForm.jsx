import { inject, observer } from "mobx-react";
import React from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import SelectField from "../components/SelectField/SelectField";
import { frameworks } from "../constants/frameworks";
import { useForm } from "react-hook-form";
import FormErrors from "../components/FormErrors/FormErrors";

const ProjectForm = ({ state, setState }) => {
  const { errors, register, handleSubmit } = useForm({
    reValidateMode: "onSubmit",
  });

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form className="container mt-6" onSubmit={handleSubmit()}>
      <div className="field-group">
        <FormLabel name="appName" text="App Name" />
        <input
          type="text"
          className="form-input"
          name="appName"
          placeholder="an-awesome-project"
          value={state.appName}
          onChange={(e) => inputHandler(e)}
          ref={register({
            required: {
              value: true,
              message: "Need a name for your awesome app",
            },
          })}
        />

        <FormErrors error={errors.appName} />
      </div>

      <div className="mt-4 field-group">
        <FormLabel text="Pick a framework" />
        <SelectField
          data={frameworks}
          stateHandler={setState}
          state={state}
          label="Select a framework"
          stateKey="framework"
          ref={register({
            required: {
              value: true,
              message: "Please choose a framework",
            },
          })}
        />
        <FormErrors error={errors.framework} />
      </div>

      <MainButton className="mt-8" default type="submit">
        Get command
      </MainButton>
    </form>
  );
};

export default ProjectForm;
