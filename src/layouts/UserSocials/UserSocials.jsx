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
      if (user[key]) {
        arr.push({
          label: key,
          link: user[key],
        });
      }
    }
  }

  if (arr.length === 0) return null;

  return (
    <div className="rounded-lg pl-3 pr-3 pt-1 pb-1 pink-gradient mt-6 mb-6 box-shadow">
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
