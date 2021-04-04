import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { getAxios } from "../../api";
import { MainButton } from "../../components/Buttons/Buttons";
import FormLabel from "../../components/FormLabel/FormLabel";
import { H1 } from "../../components/Headings/Headings";
import InputWrapper from "../../components/InputWrapper/InputWrapper";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const ForgotEnvPassword = () => {
  const [state, setState] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const params = new URLSearchParams(window.location.search).get("state");
  const history = useHistory();
  if (!params) {
    return null;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (state.newPassword !== state.confirmNewPassword) {
      return toast.error("Passwords don't match");
    }

    await getAxios({
      url: "/auth/reset_environment_password",
      method: "post",
      data: {
        ...state,
        state: params,
      },
    });

    history.push("/env");
  };

  const buttonState =
    state.newPassword && state.confirmNewPassword ? (
      <MainButton default onClick={(e) => submitHandler(e)}>
        Update password
      </MainButton>
    ) : (
      <MainButton muted>Update password</MainButton>
    );

  return (
    <DisplayWrapper>
      <div className="w-fit max-w-screen-lg">
        <H1>Reset environment password</H1>

        <form className="mt-4">
          <div className="field-group">
            <FormLabel
              name="newPassword"
              text="Reset envinroment variable password"
            />
            <InputWrapper icon={<i className="fas fa-lock"></i>}>
              <input
                className="form-input"
                type="password"
                placeholder="Input new password"
                name="newPassword"
                value={state.newPassword}
                onChange={(e) =>
                  setState({ ...state, newPassword: e.target.value })
                }
              />
            </InputWrapper>
          </div>

          <div className="field-group">
            <FormLabel
              name="confirmNewPassword"
              text="Confirm envinroment variable password"
            />
            <InputWrapper icon={<i className="fas fa-lock"></i>}>
              <input
                className="form-input"
                type="password"
                placeholder="Confirm password"
                name="confirmNewPassword"
                value={state.confirmNewPassword}
                onChange={(e) =>
                  setState({ ...state, confirmNewPassword: e.target.value })
                }
              />
            </InputWrapper>
          </div>

          {buttonState}
        </form>
      </div>
    </DisplayWrapper>
  );
};

export default ForgotEnvPassword;
