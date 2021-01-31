import React from "react";

const CodeShare = () => {
  return (
    <div className="w-full relative h-screen bg-white">
      <div
        className="absolute w-2/5 z-10"
        style={{
          left: "4em",
          top: "4em",
        }}
      >
        <h1 className="font-black text-gray-800 text-6xl">
          Share your favourite pieces of code
        </h1>
        <p className="text-4xl text-gray-700 mt-6">
          Have a function you like? Don’t want to go hunting through your Github
          repo’s to find it? Create, save and share it!
        </p>
      </div>

      <div className="absolute " style={{ bottom: "4em", right: "9em" }}>
        <img
          src={require("../../assets/undraw_code_inspection_bdl7.svg")}
          alt=""
          className="w-full object-cover max-w-2xl"
        />
      </div>
    </div>
  );
};

export default CodeShare;
