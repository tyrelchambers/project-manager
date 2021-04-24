import React, { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import "./forms.css";
import { getAxios } from "../api/index";
import useStorage from "../hooks/useStorage";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormErrors from "../components/FormErrors/FormErrors";
import { config } from "../config/config";

const SignupForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [_, setToken] = useStorage("token");
  const [pending, setPending] = useState(false);
  const { register, handleSubmit, errors, setError, getValues } = useForm({
    reValidateMode: "onSubmit",
  });

  const submitHandler = async () => {
    const { email, password, confirmPassword } = credentials;

    if (!email || !password || !confirmPassword) {
      return false;
    }

    if (getValues("password") !== getValues("confirmPassword")) {
      return setError("confirmPassword", {
        type: "manual",
        message: "Passwords don't match",
      });
    }
    setPending(true);

    await getAxios({
      url: "/auth/signup",
      method: "post",
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    }).then(({ success }) => {
      if (success.token !== undefined) {
        setToken({ value: success.token });
        window.location.pathname = "/";
      }
    });
  };

  const inputHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const authenticate = () => {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${
        config[process.env.NODE_ENV].githubClient
      }&redirect_uri=${
        config[process.env.NODE_ENV].githubRedirect
      }/signup&scope=user`,
      "tab"
    );
  };
  return (
    <div className="container max-w-screen-sm p-4">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="field-group">
          <FormLabel name="email" text="Email" />
          <p></p>
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
              maxLength: {
                value: 50,
                message: "Password can't be more than 50 characters",
              },
              minLength: {
                value: 6,
                message: "Password can't be less than 6 characters",
              },
            })}
          />
          <FormErrors error={errors.password} />
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
            ref={register({
              required: {
                value: true,
                message: "Please confirm your password. They should match.",
              },
            })}
          />
          <FormErrors error={errors.confirmPassword} />
        </div>

        <MainButton default type="submit" pending={pending}>
          Register
        </MainButton>
        <hr />
      </form>
      <MainButton classes="mt-4" github onClick={authenticate}>
        <i className="fab fa-github mr-4"></i>Authenticate with Github
      </MainButton>
      <p className="mt-6 text-gray-400">
        Or{" "}
        <Link to="/login" className="font-bold underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
