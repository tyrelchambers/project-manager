import { inject, observer } from "mobx-react";
import React from "react";
import { getAxios } from "../../api";
import Avatar from "../../components/Avatar/Avatar";
import { MainButton } from "../../components/Buttons/Buttons";
import { H1, H2Subtitle } from "../../components/Headings/Headings";
import ProfileForm from "../../forms/ProfileForm";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Profile.css";

const Profile = ({ UserStore }) => {
  const removeProfilePhoto = async () => {
    await getAxios({
      url: "/user/update",
      method: "post",
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
      <H1>Profile</H1>
      <H2Subtitle>This is your public facing information</H2Subtitle>

      <div className="flex mt-10 mb-10 profile-header">
        <Avatar url={UserStore.user.avatar} size="medium" />
        <div className="flex flex-col ml-4 profile-username">
          <p className=" font-bold text-3xl">{UserStore.user.name}</p>
          <p className=" font-bold text-xl">@{UserStore.user.username}</p>

          {UserStore.user.avatar && (
            <div className="mt-2 max-w-xs">
              <MainButton muted onClick={removeProfilePhoto}>
                Remove profile picture
              </MainButton>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 mb-10">
        <ProfileForm user={UserStore.user} />
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(Profile));
