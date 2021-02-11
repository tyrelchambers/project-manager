import React from "react";
import MobileNav from "../../components/MobileNav/MobileNav";
import { docWidth } from "../../constants/constants";
import Header from "../Header/Header";

const DisplayWrapper = (props) => {
  return (
    <>
      {docWidth ? (
        <MobileNav dark>
          <Header showNavbar={props.hideNavbar} />
        </MobileNav>
      ) : (
        <Header showNavbar={props.hideNavbar} />
      )}
      <div className="flex w-full">
        <div className="p-4 w-full">{props.children}</div>
      </div>
    </>
  );
};

export default DisplayWrapper;
