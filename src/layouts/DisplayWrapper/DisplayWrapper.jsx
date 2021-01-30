import React from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const DisplayWrapper = (props) => {
  const showNavbar = props.hideNavbar ? null : <Navbar />;
  return (
    <div>
      <Header />
      <div className="flex">
        {showNavbar}
        <div className="w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default DisplayWrapper;
