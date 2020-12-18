import React, { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import "./forms.css";
import { getAxios } from "../api/index";
import useStorage from "../hooks/useStorage";

const SignupForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [_, setToken] = useStorage("token");

  const submitHandle = (e) => {
    e.preventDefault();

    getAxios({
      url: "/auth/signup",
      method: "post",
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    }).then((res) => {
      setToken({ value: res.token });
      window.location.pathname = "/";
    });
  };

  const inputHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <form className="form">
      <div className="field-group">
        <FormLabel name="email" text="Email" />
        <input
          type="email"
          placeholder="email@example.com"
          className="form-input"
          name="email"
          value={credentials.email}
          onChange={(e) => inputHandler(e)}
        />
      </div>

      <div className="field-group">
        <FormLabel name="password" text="Password" />
        <input
          type="password"
          placeholder="password"
          className="form-input"
          name="password"
          value={credentials.password}
          onChange={(e) => inputHandler(e)}
        />
      </div>

      <div className="field-group">
        <FormLabel name="confirmPassword" text="Confirm Password" />
        <input
          type="password"
          placeholder="confirm password"
          className="form-input"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={(e) => inputHandler(e)}
        />
      </div>

      <MainButton default onClick={(e) => submitHandle(e)}>
        Register
      </MainButton>
    </form>
  );
};

export default SignupForm;
