import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { navRoutes } from "../../routes/nav.routes";
import UserWidget from "../../components/UserWidget/UserWidget";
const Navbar = () => {
  const pathWithSearch = window.location.pathname + window.location.search;
  const checkPath = (link = "") => {
    if (!link || window.location.pathname === "/") return false;

    return link === window.location.pathname;
  };
  return (
    <nav className="m-2 navbar">
      <div className="mb-4">
        <UserWidget />
      </div>
      {navRoutes.map((x, id) => (
        <div className="flex flex-col" key={id}>
          <NavLink
            exact
            to={x.url}
            className="no-underline font-bold text-white nav-item flex items-center p-4"
          >
            <div style={{ width: "25px" }}>{x.icon}</div>
            <p className="ml-6">{x.label}</p>
          </NavLink>
          {x.subnav && checkPath(x.url) && (
            <div className="nav-subnav bg-gray-800  rounded-md">
              {x.subnav.map((link, lid) => (
                <Link
                  key={lid}
                  to={link.url}
                  className={`flex m-4 items-center nav-item-subnav ${
                    link.url === pathWithSearch ? "active" : ""
                  }`}
                >
                  {link.icon}
                  <p className="ml-6">{link.label}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
