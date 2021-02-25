import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import useStorage from "../hooks/useStorage";
import { useForm } from "react-hook-form";
import FormErrors from "../components/FormErrors/FormErrors";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [_, setToken] = useStorage("token");
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: "onSubmit",
  });
  const [pending, setPending] = useState(false);

  const submitHandler = () => {
    setPending(true);
    getAxios({
      url: "/auth/login",
      method: "post",
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    }).then((res) => {
      if (res.token) {
        setToken({ value: res.token });
      }

      if (res.user) {
        window.location.pathname = "/";
      }
    });
  };

  const inputHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const authenticate = () => {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT}/login`,
      "tab"
    );
  };
  return (
    <div className="container max-w-screen-sm p-4">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="field-group">
          <FormLabel name="email" text="Email" />
          <input
            type="email"
            placeholder="email@example.com"
            className="form-input"
            name="email"
            value={credentials.email}
            onChange={(e) => inputHandler(e)}
            ref={register({
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: "Your email doesn't seem to be a real email?",
              },
              maxLength: {
                value: 50,
                message: "Your email can't be more than 50 characters, sorry!",
              },
            })}
          />

          <FormErrors error={errors.email} />
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
            ref={register({
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <FormErrors error={errors.password} />
        </div>

        <MainButton default type="submit" pending={pending}>
          Login
        </MainButton>
      </form>

      <hr />
      <MainButton classes="mt-4" github onClick={authenticate}>
        <i className="fab fa-github mr-4"></i>Login with Github
      </MainButton>
      <div className="flex mt-6">
        <p className="text-gray-400 mr-6">
          Or{" "}
          <Link to="/signup" className="font-bold underline">
            Sign up
          </Link>
        </p>

        <p className="text-gray-400">
          <Link to="/forgot_password" className="font-bold underline">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
