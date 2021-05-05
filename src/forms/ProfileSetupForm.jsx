import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormErrors from "../components/FormErrors/FormErrors";
import FormLabel from "../components/FormLabel/FormLabel";

const ProfileSetupForm = ({ UserStore }) => {
  const [state, setstate] = useState({
    username: "",
    email: "",
    name: "",
  });
  const { handleSubmit, errors, setError, register } = useForm();

  const inputHandler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    if (!state.username.trim()) {
      return setError("username", {
        type: "manual",
        message: "Still need a username",
      });
    }

    if (!state.email.trim()) {
      return setError("email", {
        type: "manual",
        message: "Still need an email",
      });
    }

    if (!state.name.trim()) {
      return setError("name", {
        type: "manual",
        message: "Still need a name",
      });
    }

    await getAxios({
      url: "/user/update",
      method: "post",
      data: {
        state,
      },
    }).then(({ success }) => {
      if (success) {
        window.location.pathname = "/";
      }
    });
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(submitHandler)}>
      <div className="field-group">
        <FormLabel text="Username" name="username" />
        <input
          type="text"
          className="form-input"
          name="username"
          placeholder="@username"
          value={state.username}
          onChange={(e) => inputHandler(e)}
          ref={register({
            required: {
              value: true,
              message: "Please add a username",
            },
          })}
        />
        <FormErrors error={errors.username} />
      </div>

      <div className="field-group">
        <FormLabel text="Name" name="name" />
        <input
          type="text"
          className="form-input"
          name="name"
          placeholder="Your name"
          value={state.name}
          onChange={(e) => inputHandler(e)}
          ref={register({
            required: {
              value: true,
              message: "Please add a name",
            },
          })}
        />
        <FormErrors error={errors.name} />
      </div>

      {!UserStore.user.email && (
        <div className="field-group">
          <FormLabel text="Email" name="email" />
          <input
            type="email"
            className="form-input"
            name="email"
            placeholder="user@example.com"
            value={state.email}
            onChange={(e) => inputHandler(e)}
            ref={register({
              required: {
                value: true,
                message: "Please add an email",
              },
            })}
          />
          <FormErrors error={errors.email} />
        </div>
      )}

      <MainButton default>Continue</MainButton>
    </form>
  );
};

export default inject("UserStore")(observer(ProfileSetupForm));
