import React, { useState } from "react";
import { getAxios } from "../../api";
import { MainButton } from "../../components/Buttons/Buttons";
import FormErrors from "../../components/FormErrors/FormErrors";
import FormLabel from "../../components/FormLabel/FormLabel";
import { H1 } from "../../components/Headings/Headings";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const { handleSubmit, errors, register, setError, getValues } = useForm();
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });

  const params = new URLSearchParams(window.location.search);

  const inputHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    const code = params.get("code");

    if (getValues("password") !== getValues("confirmPassword")) {
      return setError("confirmPassword", {
        type: "manual",
        message: "Passwords don't match",
      });
    }

    await getAxios({
      url: "/auth/reset",
      method: "post",
      data: {
        code,
        password: credentials.password,
      },
    });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <H1>Enter your new password</H1>

      <form
        className="container max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
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

        <MainButton default type="submit">
          Change password
        </MainButton>
      </form>
    </div>
  );
};

export default ResetPassword;
