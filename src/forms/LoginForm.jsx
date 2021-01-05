import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import useStorage from "../hooks/useStorage";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [_, setToken] = useStorage("token");
  const submitHandle = (e) => {
    e.preventDefault();

    getAxios({
      url: "/auth/login",
      method: "post",
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    }).then((res) => {
      if (res) {
        setToken({ value: res.token });
        window.location.pathname = "/";
      }
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

      <MainButton default onClick={(e) => submitHandle(e)}>
        Login
      </MainButton>

      <p className="mt-6 text-gray-400">
        Or{" "}
        <Link to="/signup" className="font-bold underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
