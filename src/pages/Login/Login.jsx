import React from "react";
import { H1 } from "../../components/Headings/Headings";
import LoginForm from "../../forms/LoginForm";

const Login = () => {
  return (
    <div className="flex  w-full h-screen">
      <div className="flex flex-col w-full  items-center">
        <H1 className="mt-10">Login</H1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
