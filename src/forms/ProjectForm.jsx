import React from "react";
import FormLabel from "../components/FormLabel/FormLabel";
import InputWrapper from "../components/InputWrapper/InputWrapper";
import SelectField from "../components/SelectField/SelectField";
import { frameworks } from "../constants/frameworks";

const ProjectForm = ({ state, setState }) => {
  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form className="container max-w-screen-sm">
      <div className="field-group">
        <FormLabel name="appName" text="App Name" />
        <InputWrapper icon={<i class="fas fa-signature"></i>}>
          <input
            type="text"
            className="form-input"
            name="appName"
            placeholder="an-awesome-project"
            value={state.appName}
            onChange={(e) => inputHandler(e)}
          />
        </InputWrapper>
      </div>

      <div className="mt-4 field-group">
        <FormLabel text="Pick a framework" />
        <SelectField
          data={frameworks}
          stateHandler={setState}
          state={state}
          label="Select a framework"
          stateKey="framework"
        />
      </div>
    </form>
  );
};

export default ProjectForm;
