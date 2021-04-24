import React, { useState } from "react";
import { H1 } from "../../components/Headings/Headings";
import FormLabel from "../../components/FormLabel/FormLabel";
import { MainButton } from "../../components/Buttons/Buttons";
import { useForm } from "react-hook-form";
import FormErrors from "../../components/FormErrors/FormErrors";
import { getAxios } from "../../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const { handleSubmit, errors, register } = useForm();
  const submitHandler = () => {
    console.log(email);
    getAxios({
      url: "/auth/forgot_password",
      method: "post",
      data: {
        email,
      },
    }).then(({ success }) => {
      if (success) {
        setEmailSent(true);
      }
    });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <H1>Forgot your password?</H1>
      <p>Enter the email associated with your account.</p>
      {emailSent && (
        <p>
          An email with a recovery link has been sent to the email address
          provided!
        </p>
      )}
      {!emailSent && (
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
      )}
    </div>
  );
};

export default ForgotPassword;
