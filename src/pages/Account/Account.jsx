import React from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { H2 } from "../../components/Headings/Headings";
import AccountForm from "../../forms/AccountForm";
import AccountPasswordForm from "../../forms/AccountPasswordForm";
import { inject, observer } from "mobx-react";

const Account = ({ UserStore }) => {
  return (
    <DisplayWrapper>
      <H2>Account</H2>

      <div className="mt-6 form">
        <AccountForm user={UserStore.user} />

        <hr />

        <AccountPasswordForm user={UserStore.user} />
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(Account));
