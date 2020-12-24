import React from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const DisplayWrapper = (props) => {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="m-4 w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default DisplayWrapper;
