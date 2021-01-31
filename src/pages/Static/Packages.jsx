import React from "react";
import "./index.css";
const Packages = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex justify-center  bg-white package wrapper">
      <div className="w-3/5 relative body">
        <div className="flex flex-col w-full h-full z-10 mt-10 relative">
          <p className="uppercase font-bold text-pink-500">
            quicker get-up-and-go
          </p>
          <h1 className="font-black text-gray-800 text-6xl">Packages!</h1>
          <p className="text-4xl text-gray-700 mt-6">
            Create NPM or Yarn packages and save them to your profile. This is
            beneficial for quickly getting started with your next project
            without having to worry about manually installing each individual
            package
          </p>
        </div>

        <img
          src={require("../../assets/undraw_collecting_fjjl.svg")}
          alt=""
          className="absolute w-full max-w-xl"
          style={{
            bottom: "4em",
            right: "0",
          }}
        />
      </div>
    </div>
  );
};

export default Packages;
