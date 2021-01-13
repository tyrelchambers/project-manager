import React from "react";
import { useForm } from "react-hook-form";
import { MainButton } from "../components/Buttons/Buttons";
import FormErrors from "../components/FormErrors/FormErrors";
import FormLabel from "../components/FormLabel/FormLabel";

const ResetPasswordForm = () => {
  const { handleSubmit, errors, register } = useForm();

  return (
    <form
      className="container max-w-screen-md mt-4"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="field-group">
        <FormLabel text="Email" name="email" />
        <input
          type="email"
          className="form-input"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="username@email.com"
          register={register({
            required: {
              type: true,
              message: "Email is required",
            },
          })}
        />

        <FormErrors error={errors.email} />
      </div>

      <MainButton default>Reset Password</MainButton>
    </form>
  );
};

export default ResetPasswordForm;
