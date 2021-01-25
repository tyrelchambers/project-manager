import React from "react";
import { toast } from "react-toastify";

const ToastEl = ({ text, icon }) => (
  <div className="flex items-center">
    {icon}
    <p>{text}</p>
  </div>
);

const icon = (iconName) => (
  <i className={`${iconName} mr-4 text-white text-xl `}></i>
);

const heartToast = (props) => {
  return toast(
    <ToastEl text="Someone liked your post" icon={icon("fas fa-heart")} />,
    {
      progressStyle: {
        background: "#b83280",
      },
      className: "pink-gradient",
    }
  );
};

const bookmarkToast = () => {
  return toast(
    <ToastEl text="Post saved as a bookmark" icon={icon("fas fa-bookmark")} />,
    {
      progressStyle: {
        background: "#F7CC00",
      },
      className: "brown-gradient",
    }
  );
};

export { heartToast, bookmarkToast };
