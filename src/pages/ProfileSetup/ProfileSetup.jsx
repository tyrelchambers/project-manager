import React from "react";
import { H1 } from "../../components/Headings/Headings";
import ProfileSetupForm from "../../forms/ProfileSetupForm";
const ProfileSetup = () => {
  return (
    <div className="h-screen">
      <div className="mt-10 w-full flex flex-col items-center">
        <H1>Setup your profile</H1>

        <ProfileSetupForm />
      </div>
    </div>
  );
};

export default ProfileSetup;
