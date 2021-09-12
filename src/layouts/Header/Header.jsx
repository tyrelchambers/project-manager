import React from "react";
import "./Header.css";
import { H1 } from "../../components/Headings/Headings";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import NavToolbar from "../../components/NavToolbar/NavToolbar";
import { useUser } from "../../hooks/useUser";

const Header = ({ hideNavbar }) => {
  const showNavbar = hideNavbar ? null : <Navbar />;
  const query = useUser();

  return (
    <header className="header flex flex-col  p-4">
      <div className="flex-1">
        <H1 className="mobile mb-10 mt-4">
          <Link to="/">
            <img
              src={require("../../assets/k - light.svg")}
              alt=""
              className="w-2/5"
            />
          </Link>
        </H1>
        {showNavbar}
      </div>
      {query.isSuccess && query.data.user && (
        <NavToolbar user={query.data.user} />
      )}
    </header>
  );
};

export default Header;
