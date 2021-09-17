import React, { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import { useForm } from "react-hook-form";
import FormErrors from "../components/FormErrors/FormErrors";
import { useHistory } from "react-router-dom";
import InputWrapper from "../components/InputWrapper/InputWrapper";
import { useEnvVars } from "../hooks/useEnvVars";

const EnvVarForm = () => {
  const [state, setState] = useState({
    name: "",
    variables: "",
  });
  const { handleSubmit, errors, register, setError } = useForm({
    reValidateMode: "onSubmit",
  });
  const history = useHistory();
  const { createEnv } = useEnvVars();

  const submitHandler = async () => {
    if (!state.name.trim()) {
      return setError("name", {
        type: "manual",
        message: "Still need a name",
      });
    }

    createEnv.mutate(state);

    history.push("/env");
  };
  return (
    <form
      className="container mt-8 max-w-screen-md"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="field-group">
        <FormLabel text="Name" name="envName" />
        <InputWrapper icon={<i class="fas fa-signature"></i>}>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Variable name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            ref={register({
              required: {
                value: true,
                message: "We need a name for your variables",
              },
            })}
          />
        </InputWrapper>
        <FormErrors error={errors.name} />
      </div>

      <div className="field-group">
        <FormLabel text="Variables" name="envVariable" />

        <textarea
          name="envVariable"
          rows="10"
          className="form-input"
          placeholder="Copy variables here..."
          value={state.variables}
          onChange={(e) => setState({ ...state, variables: e.target.value })}
        />
      </div>

      <MainButton default>Save</MainButton>
    </form>
  );
};

export default EnvVarForm;
