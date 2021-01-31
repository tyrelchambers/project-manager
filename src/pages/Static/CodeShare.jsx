import React from "react";
import "./index.css";
const CodeShare = () => {
  return (
    <div className="w-full h-screen bg-white code wrapper flex justify-center items-center">
      <div className="w-3/5 relative h-full" style={{ maxHeight: "900px" }}>
        <div
          className="absolute w-3/5 z-10 mobile-w-full wrapper-left"
          style={{
            left: "4em",
            top: "4em",
          }}
        >
          <h1 className="font-black text-gray-800 text-6xl">
            Share your favourite pieces of code
          </h1>
          <p className="text-4xl text-gray-700 mt-6">
            Have a function you like? Don’t want to go hunting through your
            Github repo’s to find it? Create, save and share it!
          </p>
        </div>

        <div
          className="absolute mobile-hidden wrapper-right"
          style={{ bottom: "1em", right: "9em" }}
        >
          <img
            src={require("../../assets/undraw_code_inspection_bdl7.svg")}
            alt=""
            className="w-full object-cover max-w-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeShare;
