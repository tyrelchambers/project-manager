import React from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import "./forms.css";
const SignupForm = () => {
  return (
    <form className="form">
      <div className="field-group">
        <FormLabel name="email" text="Email" />
        <input
          type="text"
          placeholder="email@example.com"
          className="form-input"
          name="email"
        />
      </div>

      <div className="field-group">
        <FormLabel name="password" text="Password" />
        <input
          type="password"
          placeholder="password"
          className="form-input"
          name="password"
        />
      </div>

      <div className="field-group">
        <FormLabel name="confirmPassword" text="Confirm Password" />
        <input
          type="password"
          placeholder="confirm password"
          className="form-input"
          name="confirmPassword"
        />
      </div>

      <MainButton>Register</MainButton>
    </form>
  );
};

export default SignupForm;
