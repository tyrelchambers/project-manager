import React from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const DisplayWrapper = (props) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Navbar />
        {props.children}
      </div>
    </div>
  );
};

export default DisplayWrapper;
