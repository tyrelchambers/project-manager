import React from "react";
import Header from "../Header/Header";

const DisplayWrapper = (props) => {
  return (
    <div className="flex ">
      <Header showNavbar={props.hideNavbar} />
      <div className="flex w-full">
        <div className="m-4 w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default DisplayWrapper;
