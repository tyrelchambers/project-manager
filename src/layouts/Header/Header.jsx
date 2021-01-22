import React from "react";
import "./Header.css";
import { H1 } from "../../components/Headings/Headings";
import UserSearch from "../../components/UserSearch/UserSearch";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header flex justify-between p-4">
      <H1>
        <Link to="/">Kanlen</Link>
      </H1>
      <UserSearch />
    </header>
  );
};

export default Header;
