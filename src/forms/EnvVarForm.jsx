import React, { useState } from "react";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";

const EnvVarForm = () => {
  const [state, setState] = useState({
    name: "",
    variables: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    await getAxios({
      url: "/env/new",
      method: "post",
      data: state,
    });
  };
  return (
    <form className="form mt-8">
      <div className="field-group">
        <FormLabel text="Name" name="envName" />
        <input
          type="text"
          className="form-input"
          placeholder="Variable name"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
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

      <MainButton default onClick={(e) => submitHandler(e)}>
        Save
      </MainButton>
    </form>
  );
};

export default EnvVarForm;
