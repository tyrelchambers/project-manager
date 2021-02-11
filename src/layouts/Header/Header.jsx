import React from "react";
import "./Header.css";
import { H1 } from "../../components/Headings/Headings";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import NavToolbar from "../../components/NavToolbar/NavToolbar";
import { inject, observer } from "mobx-react";

const Header = ({ UserStore, hideNavbar }) => {
  const showNavbar = hideNavbar ? null : <Navbar />;

  return (
    <header className="header flex flex-col  p-4">
      <div className="flex-1">
        <H1 className="mobile">
          <Link to="/">Kanlen</Link>
        </H1>
        {showNavbar}
      </div>
      <NavToolbar user={UserStore.user} />
    </header>
  );
};

export default inject("UserStore")(observer(Header));
