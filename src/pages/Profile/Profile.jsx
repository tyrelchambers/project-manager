import { inject, observer } from "mobx-react";
import React from "react";
import { H2, H2Subtitle } from "../../components/Headings/Headings";
import AccountForm from "../../forms/AccountForm";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const Profile = ({ UserStore }) => {
  return (
    <DisplayWrapper>
      <H2>Profile</H2>
      <H2Subtitle>This is your public facing information</H2Subtitle>
      <div className="mt-6">
        <AccountForm user={UserStore.user} />
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(Profile));
