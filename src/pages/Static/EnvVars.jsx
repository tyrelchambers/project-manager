import React from "react";
import "./index.css";
const EnvVars = () => {
  return (
    <div className="flex bg-white h-screen overflow-hidden envvar wrapper">
      <div className="w-1/2 p-8 flex flex-col justify-center wrapper-left">
        <div className="w-full">
          <p className="uppercase font-bold text-pink-500">
            don’t worry... it’s going to be okay
          </p>
          <h1 className="font-black text-gray-800 text-6xl">
            Save your environment variables
          </h1>
          <div className="w-4/5">
            <p className="text-4xl text-gray-700 mt-6">
              Did your hard-drive mysteriously die and you don’t remember the
              environment variables you needed in order to develop the next-best
              cat-pics app?
            </p>
            <p className="text-4xl text-gray-700 mt-6">
              Save your environment variables just in case!
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center relative wrapper-right">
        <div
          className="bg-gray-800 w-full h-full absolute"
          style={{
            transform: "skew(-15deg) scale(2)",
            right: "-350px",
          }}
        ></div>
        <img
          src={require("../../assets/shield.png")}
          alt="Code"
          className="absolute"
        />
      </div>
    </div>
  );
};

export default EnvVars;
