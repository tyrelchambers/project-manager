import React from "react";
import FormLabel from "../components/FormLabel/FormLabel";

const ProfileSetupForm = () => {
  return (
    <form className="form">
      <div className="field-group">
        <FormLabel text="Name" name="name" />
        <input type="text" className="form-input" placeholder="John Smith" />
      </div>
    </form>
  );
};

export default ProfileSetupForm;
