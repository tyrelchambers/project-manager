import React from "react";
import { H1 } from "../../components/Headings/Headings";
import ProfileSetupForm from "../../forms/ProfileSetupForm";

const ProfileSetup = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-screen-md flex flex-col justify-center mt-10">
        <H1 className="text-center">Let's setup your profile real quick</H1>
        <ProfileSetupForm />
      </div>
    </div>
  );
};

export default ProfileSetup;
