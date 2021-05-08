import React from "react";
import "./Header.css";
import { H1 } from "../../components/Headings/Headings";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import NavToolbar from "../../components/NavToolbar/NavToolbar";
import { inject, observer } from "mobx-react";
import useStorage from "../../hooks/useStorage";

const Header = ({ UserStore, hideNavbar }) => {
  const showNavbar = hideNavbar ? null : <Navbar />;
  const [token, _] = useStorage("token");
  return (
    <header className="header flex flex-col  p-4">
      <div className="flex-1">
        <H1 className="mobile mb-10 mt-4">
          <Link to="/">
            <img
              src={require("../../assets/k - light.svg")}
              alt=""
              className="w-3/5"
            />
          </Link>
        </H1>
        {showNavbar}
      </div>
      {token && <NavToolbar user={UserStore.user} />}
    </header>
  );
};

export default inject("UserStore")(observer(Header));
