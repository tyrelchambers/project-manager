import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import ProjectConfirm from "../components/ProjectConfirm/ProjectConfirm";
import SelectField from "../components/SelectField/SelectField";
import { frameworks, packagePrefs } from "../constants/frameworks";
import { useForm } from "react-hook-form";
import FormErrors from "../components/FormErrors/FormErrors";

const ProjectForm = ({ ModalStore }) => {
  const [q, setQ] = useState("");
  const [state, setState] = useState({
    appName: "",
    framework: {},
    package: {},
    bundler: {},
  });
  const { errors, register, handleSubmit } = useForm({
    reValidateMode: "onSubmit",
  });

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleModal = () => {
    ModalStore.setRender(<ProjectConfirm state={state} />);
    ModalStore.setIsOpen(true);
  };
  return (
    <form className="form mt-8" onSubmit={handleSubmit(handleModal)}>
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

      <div className="mt-4 field-group">
        <FormLabel text="Pick a bundler" />

        <SelectField
          data={packagePrefs}
          stateHandler={setState}
          state={state}
          label="Select a bundler"
          stateKey="bundler"
          ref={register({
            required: {
              value: true,
              message: "Please choose a bundler",
            },
          })}
        />
        <FormErrors error={errors.bundler} />
      </div>

      <MainButton className="mt-8" default type="submit">
        Get command
      </MainButton>
    </form>
  );
};

export default inject("ModalStore")(observer(ProjectForm));
