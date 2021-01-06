import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { navRoutes, unauthenticatedRoutes } from "../../routes/nav.routes";
import UserWidget from "../../components/UserWidget/UserWidget";
import { inject, observer } from "mobx-react";
const Navbar = ({ UserStore }) => {
  const [openSubnav, setOpenSubnav] = useState("");
  const pathWithSearch = window.location.pathname + window.location.search;

  const subnavHandler = (route) => {
    if (route.subnav) {
      setOpenSubnav(route.label);
    }
  };

  const AuthenticatedRoutes = () => {
    return navRoutes.map((x, id) => (
      <div className="flex flex-col" key={id}>
        {!x.subnav ? (
          <NavLink
            exact
            to={x.url}
            className="no-underline font-bold text-white nav-item flex items-center p-4"
            onClick={() => subnavHandler(x)}
            isActive={(match, location) => {
              if (!match) {
                return false;
              }
              return true;
            }}
          >
            <div style={{ width: "25px" }}>{x.icon}</div>
            <p className="ml-6">{x.label}</p>
          </NavLink>
        ) : (
          <div
            className="no-underline font-bold text-white nav-item flex items-center p-4"
            onClick={() => subnavHandler(x)}
          >
            <div style={{ width: "25px" }}>{x.icon}</div>
            <p className="ml-6">{x.label}</p>
          </div>
        )}
        {x.subnav && openSubnav === x.label && (
          <div className="nav-subnav bg-gray-800 mt-2 mb-2 rounded-md">
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
    ));
  };
  const UnauthenticatedRoutes = () => {
    return unauthenticatedRoutes.map((x, id) => (
      <NavLink
        exact
        to={x.url}
        className="no-underline font-bold text-white nav-item flex items-center p-4"
        onClick={() => subnavHandler(x)}
        isActive={(match, location) => {
          if (!match) {
            return false;
          }
          return true;
        }}
      >
        <div style={{ width: "25px" }}>{x.icon}</div>
        <p className="ml-6">{x.label}</p>
      </NavLink>
    ));
  };

  return (
    <nav className="m-2 navbar">
      <div className="mb-4">
        {UserStore.user.uuid ? (
          <>
            <UserWidget />

            <AuthenticatedRoutes />
          </>
        ) : (
          <UnauthenticatedRoutes />
        )}
      </div>
    </nav>
  );
};

export default inject("UserStore")(observer(Navbar));
