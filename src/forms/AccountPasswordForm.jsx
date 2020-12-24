import React, { useEffect, useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import isEmpty from "../helpers/isEmpty";

const AccountPasswordForm = ({ user }) => {
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.name });
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

      <MainButton muted>Save password</MainButton>
    </form>
  );
};

export default AccountPasswordForm;
