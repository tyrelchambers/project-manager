import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header flex items-center justify-end p-4">
      <Link className="btn primary circle bg-pink-500" to="/project/new">
        <i className="fas fa-plus "></i>
      </Link>
    </header>
  );
};

export default Header;
