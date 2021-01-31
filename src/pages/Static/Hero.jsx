import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex bg-white h-screen overflow-hidden">
      <div className="w-1/2 p-8 flex flex-col justify-center">
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

      <div className="w-1/2 flex flex-col justify-center relative">
        <div
          className="bg-gray-800 w-full h-full absolute"
          style={{
            transform: "skew(-15deg) scale(2)",
            right: "-350px",
          }}
        ></div>
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
