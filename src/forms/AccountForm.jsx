import React, { useEffect, useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import isEmpty from "../helpers/isEmpty";

const AccountForm = ({ user }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    setState(user);
  }, [user]);

  if (isEmpty(state)) return null;

  return (
    <form className="form">
      <div className="field-group">
        <FormLabel text="Email" name="email" />
        <input
          type="text"
          className="form-input"
          placeholder="user@example.com"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
        />
      </div>
      <MainButton muted>Save account info</MainButton>
    </form>
  );
};

export default AccountForm;
