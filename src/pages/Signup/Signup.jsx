import React from "react";
import { H1 } from "../../components/Headings/Headings";
import SignupForm from "../../forms/SignupForm";
import "./Signup.css";
const Signup = () => {
  return (
    <div className="flex  h-screen">
      <div className="flex flex-col w-full  items-center">
        <H1 className="mt-10">Sign Up</H1>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
