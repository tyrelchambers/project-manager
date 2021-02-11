import React from "react";
import MobileNav from "../../components/MobileNav/MobileNav";
import Header from "../Header/Header";

const DisplayWrapper = (props) => {
  const docWidth = document.body.clientWidth <= 768;
  console.log(docWidth);
  return (
    <div className="flex ">
      {docWidth ? (
        <MobileNav dark>
          <Header showNavbar={props.hideNavbar} />
        </MobileNav>
      ) : (
        <Header showNavbar={props.hideNavbar} />
      )}
      <div className="flex w-full">
        <div className="m-4 w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default DisplayWrapper;
