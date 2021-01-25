import React from "react";
import { toast } from "react-toastify";

const WithHeart = ({ text }) => (
  <div className="flex items-center">
    <i className="fas fa-heart mr-4 text-white text-xl"></i>
    <p>{text}</p>
  </div>
);

const heartToast = (props) => {
  return toast(<WithHeart text="Someone liked your post" />, {
    progressStyle: {
      background: "#b83280",
    },
    className: "pink-gradient",
  });
};

export { heartToast };
