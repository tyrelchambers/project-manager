import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormErrors from "../components/FormErrors/FormErrors";
import FormLabel from "../components/FormLabel/FormLabel";
import { removeSpecialChar } from "../helpers/removeSpecialChar";
import { useUser } from "../hooks/useUser";

const ProfileSetupForm = () => {
  const [state, setstate] = useState({
    username: "",
    email: "",
    name: "",
  });
  const { handleSubmit, errors, setError, register } = useForm();
  const userQuery = useUser();

  useEffect(() => {
    if (userQuery.data) {
      setstate({ email: userQuery.data.user.email });
    }
  }, [userQuery.data]);

  if (!userQuery.data) return null;

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
          onChange={(e) =>
            setstate({ ...state, username: removeSpecialChar(e.target.value) })
          }
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

      {!userQuery.data.user.email && (
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

export default ProfileSetupForm;
