import { inject, observer } from "mobx-react";
import React from "react";
import { getAxios } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import { MainButton } from "../../components/Buttons/Buttons";
import { H2, H2Subtitle } from "../../components/Headings/Headings";
import AccountForm from "../../forms/AccountForm";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const Profile = ({ UserStore }) => {
  const removeProfilePhoto = async () => {
    await getAxios({
      url: "/account/update",
      method: "patch",
      data: {
        state: {
          avatar: "",
        },
      },
    });

    await getAxios({
      url: "/upload/delete",
      method: "delete",
      params: {
        url: UserStore.user.avatar,
      },
    });
  };

  return (
    <DisplayWrapper>
      <H2>Profile</H2>
      <H2Subtitle>This is your public facing information</H2Subtitle>

      <div className="flex mt-10 mb-10">
        <Avatar url={UserStore.user.avatar} size="large" />
        <div className="flex flex-col ml-4">
          <p className=" font-bold text-3xl">{UserStore.user.name}</p>
          {UserStore.user.avatar && (
            <MainButton classes="mt-2" muted onClick={removeProfilePhoto}>
              Remove profile picture
            </MainButton>
          )}
        </div>
      </div>
      <div className="mt-6">
        <AccountForm user={UserStore.user} />
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(Profile));
