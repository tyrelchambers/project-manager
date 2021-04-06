import React from "react";
import "./UserSocials.css";

const icons = {
  twitter: <i className="text-white fab fa-twitter"></i>,
  facebook: <i className="text-white fab fa-facebook"></i>,
  devto: <i className="text-white fab fa-dev"></i>,
  stackoverflow: <i className="text-white fab fa-stack-overflow"></i>,
  instagram: <i className="text-white fab fa-instagram"></i>,
  website: <i className="text-white fas fa-globe"></i>,
  github: <i className="text-white fab fa-github"></i>,
  podcast: <i className="text-white fas fa-microphone-alt"></i>,
  youtube: <i className="text-white fab fa-youtube"></i>,
};

const UserSocials = ({ user }) => {
  const arr = [];

  for (const key in icons) {
    if (Object.hasOwnProperty.call(user, key)) {
      const obj = {};

      if (key === "twitter") {
        obj.label = key;
        obj.link = `https://twitter.com/${user["twitter"]}`;
      } else if (key === "instagram") {
        obj.label = key;
        obj.link = `https://instagram.com/${user["instagram"]}`;
      } else if (key === "github") {
        obj.label = key;
        obj.link = `https://github.com/${user["github"]}`;
      } else {
        if (user[key]) {
          obj.label = key;
          obj.link = user[key];
        }
      }

      arr.push(obj);
    }
  }

  if (arr.length === 0) return null;

  return (
    <div className="pl-3 pr-3 pt-1 pb-1 ">
      {arr.map((i) => (
        <a
          href={i.link}
          className="social-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          {icons[i.label]}
        </a>
      ))}
    </div>
  );
};

export default UserSocials;
