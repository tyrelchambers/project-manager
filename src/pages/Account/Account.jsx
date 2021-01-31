import React from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { H1, H2Subtitle } from "../../components/Headings/Headings";
import AccountPasswordForm from "../../forms/AccountPasswordForm";
import { inject, observer } from "mobx-react";

const Account = ({ UserStore }) => {
  return (
    <DisplayWrapper>
      <H1>Account</H1>
      <H2Subtitle>Edit your private information</H2Subtitle>

      <div className="mt-6 form">
        <AccountPasswordForm user={UserStore.user} />
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(Account));
