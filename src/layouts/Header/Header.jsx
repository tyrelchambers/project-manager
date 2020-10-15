import React from "react";
import "./Header.css";
import { MainButton } from "../../components/Buttons/Buttons";
const Header = () => {
  return (
    <header className="header flex items-center justify-end p-4">
      <MainButton className="small">
        <i className="fas fa-plus mr-4"></i>
        Create project
      </MainButton>
    </header>
  );
};

export default Header;
