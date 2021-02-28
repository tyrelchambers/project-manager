import React, { useState } from "react";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import InputWrapper from "../components/InputWrapper/InputWrapper";

const AccountPasswordForm = () => {
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await getAxios({
      url: "/account/save",
      method: "post",
      data: state,
    });
  };

  const buttonState = () => {
    if (
      state.currentPassword &&
      state.newPassword &&
      state.confirmNewPassword
    ) {
      return (
        <MainButton default onClick={(e) => submitHandler(e)}>
          Save password &amp; refresh
        </MainButton>
      );
    } else {
      return (
        <MainButton muted disabled>
          Save password &amp; refresh
        </MainButton>
      );
    }
  };

  return (
    <form className="container max-w-screen-sm">
      <div className="field-group">
        <FormLabel text="Current password" name="currentPassword" />
        <InputWrapper icon={<i class="fas fa-lock"></i>}>
          <input
            type="password"
            className="form-input"
            name="currentPassword"
            value={state.currentPassword}
            onChange={(e) => inputHandler(e)}
            autoComplete="new-password"
          />
        </InputWrapper>
      </div>

      <div className="field-group">
        <FormLabel text="New Password" name="newPassword" />
        <InputWrapper icon={<i class="fas fa-lock"></i>}>
          <input
            type="password"
            name="newPassword"
            className="form-input"
            value={state.newPassword}
            onChange={(e) => inputHandler(e)}
            autoComplete="new-password"
          />
        </InputWrapper>
      </div>

      <div className="field-group">
        <FormLabel text="Confirm New Password" name="confirmNewPassword" />
        <InputWrapper icon={<i class="fas fa-lock"></i>}>
          <input
            type="password"
            className="form-input"
            name="confirmNewPassword"
            value={state.confirmNewPassword}
            onChange={(e) => inputHandler(e)}
            autoComplete="new-password"
          />
        </InputWrapper>
      </div>

      {buttonState()}
    </form>
  );
};

export default AccountPasswordForm;
