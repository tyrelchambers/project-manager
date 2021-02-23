import React from "react";
import "./UserSubNav.css";

const UserSubNav = ({ tab, setTab }) => {
  const tabHandler = (tab) => {
    setTab(tab);
  };
  return (
    <div className="user-subnav flex w-full justify-center mt-10 mb-5 rounded-lg overflow-hidden">
      <Tab currentTab={tab} tabHandler={tabHandler} text="Feed" />
      <Tab currentTab={tab} tabHandler={tabHandler} text="Followers" />
      <Tab currentTab={tab} tabHandler={tabHandler} text="Following" />
      <Tab currentTab={tab} tabHandler={tabHandler} text="Snippets" />
    </div>
  );
};

const Tab = ({ currentTab, text, tabHandler }) => {
  const textLwr = text.toLowerCase();
  return (
    <div
      className={`subnav-item flex-1 text-center ${
        currentTab === textLwr ? "active" : ""
      }`}
      onClick={() => tabHandler(textLwr)}
    >
      <p>{text}</p>
    </div>
  );
};

export default UserSubNav;
