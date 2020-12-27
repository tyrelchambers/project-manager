import React, { useState } from "react";
import FormLabel from "../components/FormLabel/FormLabel";
import { MainButton } from "../components/Buttons/Buttons";
import { getAxios } from "../api/index";
const ProfileSetupForm = () => {
  const [state, setState] = useState({
    name: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await getAxios({
      url: "/user/update",
      method: "patch",
      data: state,
    });

    window.location.pathname = "/";
  };
  return (
    <form className="form">
      <div className="field-group">
        <FormLabel text="Name" name="name" />
        <input
          type="text"
          className="form-input"
          placeholder="John Smith"
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
      </div>
      <MainButton default onClick={(e) => submitHandler(e)}>
        Save &amp; Continue
      </MainButton>
    </form>
  );
};

export default ProfileSetupForm;
