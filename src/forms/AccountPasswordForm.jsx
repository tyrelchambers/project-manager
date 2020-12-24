import React, { useEffect, useState } from "react";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";

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
    <form className="form">
      <div className="field-group">
        <FormLabel text="Current password" name="currentPassword" />
        <input
          type="password"
          className="form-input"
          name="currentPassword"
          value={state.currentPassword}
          onChange={(e) => inputHandler(e)}
          autoComplete="new-password"
        />
      </div>

      <div className="field-group">
        <FormLabel text="New Password" name="newPassword" />
        <input
          type="password"
          name="newPassword"
          className="form-input"
          value={state.newPassword}
          onChange={(e) => inputHandler(e)}
          autoComplete="new-password"
        />
      </div>

      <div className="field-group">
        <FormLabel text="Confirm New Password" name="confirmNewPassword" />
        <input
          type="password"
          className="form-input"
          name="confirmNewPassword"
          value={state.confirmNewPassword}
          onChange={(e) => inputHandler(e)}
          autoComplete="new-password"
        />
      </div>

      {buttonState()}
    </form>
  );
};

export default AccountPasswordForm;
