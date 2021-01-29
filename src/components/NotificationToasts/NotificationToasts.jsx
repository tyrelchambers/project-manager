import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getType } from "../Notification/types";

const ToastEl = ({ text, icon }) => (
  <div className="flex items-center">
    {icon}
    <p>{text}</p>
  </div>
);

const icon = (iconName) => (
  <i className={`${iconName} mr-4 text-white text-xl `}></i>
);

const heartToast = (n) => {
  return toast(
    <ToastEl
      text={
        <>
          <Link to={`/user/${n.from.uuid}`} className="font-bold underline">
            {n.from.name}
          </Link>{" "}
          {getType({ type: n.type, target: n.post.uuid })}
        </>
      }
      icon={icon("fas fa-heart")}
    />,
    {
      progressStyle: {
        background: "#b83280",
      },
      className: "pink-gradient",
      closeOnClick: false,
    }
  );
};

const bookmarkToast = (n) => {
  return toast(
    <ToastEl
      text={
        <>
          <Link to={`/user/${n.from.uuid}`} className="font-bold underline">
            {n.from.name}
          </Link>{" "}
          {getType({ type: n.type, target: n.post.uuid })}
        </>
      }
      icon={icon("fas fa-bookmark")}
    />,
    {
      progressStyle: {
        background: "#F7CC00",
      },
      className: "brown-gradient",
      closeOnClick: false,
    }
  );
};

const followToast = () => {
  return toast(
    <ToastEl text="Someone followed you!" icon={icon("fas fa-user-plus")} />,
    {
      progressStyle: {
        background: "#A3CFCD",
      },
      className: "dark-gradient",
      closeOnClick: false,
    }
  );
};

export { heartToast, bookmarkToast, followToast };
