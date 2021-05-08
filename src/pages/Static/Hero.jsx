import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
const Hero = () => {
  return (
    <div className="flex bg-white h-screen overflow-hidden wrapper hero">
      <div className="w-1/2 p-8 flex flex-col justify-center z-10 relative wrapper-left">
        <div className="w-4/5">
          <img
            src={require("../../assets/k - dark.svg")}
            alt="kanlen wordmark"
            className="w-56 mb-20"
          />
          <h1 className="font-black text-pink-500 text-6xl">
            Discuss. Share. Grow.
          </h1>
          <p className="text-4xl text-gray-700 mt-6">
            A place for developers to share code, share ideas, and grow their
            craft
          </p>

          <Link
            to="/signup"
            className="w-3/5 flex bg-gray-800 text-white p-4 mt-10 rounded-lg justify-center font-bold box-shadow"
          >
            Get started
          </Link>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center relative wrapper-right">
        <div className="bg-gray-800 w-full h-full absolute"></div>
        <img
          src={require("../../assets/social.png")}
          alt="Code"
          className="absolute"
        />
      </div>
    </div>
  );
};

export default Hero;
