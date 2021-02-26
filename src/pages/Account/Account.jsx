import React from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import {
  H1,
  H2,
  H2Subtitle,
  H3Subtitle,
} from "../../components/Headings/Headings";
import AccountPasswordForm from "../../forms/AccountPasswordForm";
import { inject, observer } from "mobx-react";
import { MainButton } from "../../components/Buttons/Buttons";
import { getAxios } from "../../api";

const Account = ({ UserStore }) => {
  const deleteAccount = async () => {
    const confirm = window.confirm("Was this a mistake or shall we continue?");
    if (confirm) {
      await getAxios({
        url: "/user/me",
        method: "delete",
      }).then((res) => {
        if (res) {
          window.localStorage.clear();
          window.location.pathname = "/";
        }
      });
    }
  };
  return (
    <DisplayWrapper>
      <H1>Account</H1>
      <H2Subtitle>Edit your private information</H2Subtitle>

      <div className="mt-6 container max-w-screen-sm">
        <AccountPasswordForm user={UserStore.user} />
        <hr />

        <H2>Danger Zone</H2>
        <H3Subtitle>Cancel your account. Nothing will remain.</H3Subtitle>
        <MainButton classes="bg-gray-900 mt-6" delete onClick={deleteAccount}>
          Delete Account
        </MainButton>
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(Account));
