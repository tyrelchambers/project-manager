import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MobileNav.css";

const MobileNav = ({ routes, children, dark }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`mobile-nav-wrapper ${dark ? "dark" : ""} ${
        isOpen ? "open" : ""
      }`}
    >
      <div
        className={`toggle-wrapper grid grid-cols-3 grid-rows-3 ${
          isOpen ? "open" : ""
        } `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`dot arrow ${isOpen ? "bg-pink-500" : "bg-gray-800"}`}
        ></span>
        <span className="dot white"></span>
        <span className="dot white"></span>
        <span
          className={`dot arrow ${isOpen ? "bg-pink-500" : "bg-gray-800"}`}
        ></span>
        <span
          className={`dot arrow ${isOpen ? "bg-pink-500" : "bg-gray-800"}`}
        ></span>
        <span className="dot white"></span>
        <span
          className={`dot arrow ${isOpen ? "bg-pink-500" : "bg-gray-800"}`}
        ></span>
        <span className="dot white"></span>
        <span className="dot white"></span>
      </div>

      <nav className="mobile-nav p-4">
        {!children && (
          <ul>
            {routes.map((r) => (
              <li className="mobile-nav-item" key={r.label}>
                <Link to={r.slug}>{r.label}</Link>
              </li>
            ))}
          </ul>
        )}
        {children && children}
      </nav>
    </div>
  );
};

export default MobileNav;
