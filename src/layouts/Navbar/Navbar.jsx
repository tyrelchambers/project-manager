import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { navRoutes } from "../../routes/nav.routes";
import UserWidget from "../../components/UserWidget/UserWidget";
const Navbar = () => {
  return (
    <nav className="m-2 navbar">
      <div className="mb-4">
        <UserWidget />
      </div>
      {navRoutes.map((x, id) => (
        <NavLink
          to={x.url}
          className="no-underline font-bold text-white nav-item flex items-center p-4"
          key={id}
        >
          {x.icon}
          <p className="ml-6">{x.label}</p>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
