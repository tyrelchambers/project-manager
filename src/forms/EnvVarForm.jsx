import React, { useState } from "react";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import { useForm } from "react-hook-form";
import FormError from "../components/FormErrors/FormErrors";

const EnvVarForm = () => {
  const [state, setState] = useState({
    name: "",
    variables: "",
  });
  const { handleSubmit, errors, register, setError } = useForm({
    reValidateMode: "onSubmit",
  });

  const submitHandler = async () => {
    if (!state.name.trim()) {
      return setError("name", {
        type: "manual",
        message: "Still need a name",
      });
    }

    await getAxios({
      url: "/env/new",
      method: "post",
      data: state,
    });
  };
  return (
    <form className="form mt-8" onSubmit={handleSubmit(submitHandler)}>
      <div className="field-group">
        <FormLabel text="Name" name="envName" />
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
        <FormError error={errors.name} />
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
