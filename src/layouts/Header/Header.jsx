import React from "react";
import "./Header.css";
import { H1 } from "../../components/Headings/Headings";
import UserSearch from "../../components/UserSearch/UserSearch";
const Header = () => {
  return (
    <header className="header flex justify-between p-4">
      <H1>Kanlen</H1>
      <UserSearch />
    </header>
  );
};

export default Header;
