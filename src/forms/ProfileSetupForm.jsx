import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MainButton } from "../components/Buttons/Buttons";
import FormErrors from "../components/FormErrors/FormErrors";
import FormLabel from "../components/FormLabel/FormLabel";
import { removeSpecialChar } from "../helpers/removeSpecialChar";
import { useUser } from "../hooks/useUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
const ProfileSetupForm = () => {
  const [state, setstate] = useState({});
  const { handleSubmit, errors, setError, register } = useForm();
  const userQuery = useUser();
  const mutation = useUpdateUser();

  useEffect(() => {
    if (userQuery.data?.user) {
      setstate({ email: userQuery.data.user.email });
    }
  }, []);

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

    mutation.mutate(state);
    window.location.pathname = "/";
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
