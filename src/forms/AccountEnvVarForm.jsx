import React, { useState } from "react";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import InputWrapper from "../components/InputWrapper/InputWrapper";

const AccountEnvVarForm = () => {
  const [state, setState] = useState({
    envPassword: "",
    confirmEnvPassword: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await getAxios({
      url: "/account/envvar",
      method: "post",
      data: state,
    });
  };

  const buttonState = () => {
    if (state.envPassword && state.confirmEnvPassword) {
      return (
        <MainButton default onClick={(e) => submitHandler(e)}>
          Save password
        </MainButton>
      );
    } else {
      return (
        <MainButton muted disabled>
          Save password
        </MainButton>
      );
    }
  };

  return (
    <form className="container max-w-screen-sm">
      <div className="field-group">
        <FormLabel text="Environment Variable Password" name="envVarPassword" />

        <InputWrapper icon={<i class="fas fa-lock"></i>}>
          <input
            type="password"
            className="form-input"
            name="envVarPassword"
            autoComplete="new-password"
            value={state.envPassword}
            onChange={(e) =>
              setState({ ...state, envPassword: e.target.value })
            }
          />
        </InputWrapper>
      </div>

      <div className="field-group">
        <FormLabel
          text="Confirm Environment Variable Password"
          name="confirmEnvVarPassword"
        />

        <InputWrapper icon={<i class="fas fa-lock"></i>}>
          <input
            type="password"
            className="form-input"
            name="confirmEnvVarPassword"
            autoComplete="new-password"
            value={state.confirmEnvPassword}
            onChange={(e) =>
              setState({ ...state, confirmEnvPassword: e.target.value })
            }
          />
        </InputWrapper>
      </div>

      {buttonState()}
    </form>
  );
};

export default AccountEnvVarForm;
