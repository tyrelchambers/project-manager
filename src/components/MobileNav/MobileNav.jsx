import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MobileNav.css";

const MobileNav = ({ routes, children, dark }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`toggle-wrapper ${
          dark ? "dark" : "light"
        } grid grid-cols-3 grid-rows-3 ${isOpen && "open"} `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`dot arrow`}></span>
        <span className="dot white"></span>
        <span className="dot white"></span>
        <span className={`dot arrow`}></span>
        <span className={`dot arrow`}></span>
        <span className="dot white"></span>
        <span className={`dot arrow`}></span>
        <span className="dot white"></span>
        <span className="dot white"></span>
      </div>

      <div
        className={`mobile-nav-wrapper relative ${dark ? "dark" : "light"} ${
          isOpen ? "open" : ""
        }`}
      >
        <nav className="mobile-nav p-4">
          {!children && (
            <ul className="mt-6">
              {routes.map((r) => (
                <li className="mobile-nav-item" key={r.label}>
                  <Link to={r.slug} onClick={() => setIsOpen(false)}>
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {children && children}
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
