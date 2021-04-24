import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormErrors from "../components/FormErrors/FormErrors";
import FormLabel from "../components/FormLabel/FormLabel";

const ProfileSetupForm = () => {
  const [state, setstate] = useState({
    username: "",
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

      <MainButton default>Continue</MainButton>
    </form>
  );
};

export default ProfileSetupForm;
