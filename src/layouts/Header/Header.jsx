import React from "react";
import "./Header.css";
import { H1 } from "../../components/Headings/Headings";
const Header = () => {
  return (
    <header className="header flex items-center p-4">
      <H1>Kanlen</H1>
    </header>
  );
};

export default Header;
