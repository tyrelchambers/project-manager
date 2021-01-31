import React from "react";
import "./index.css";
const VSCode = () => {
  return (
    <div className="flex bg-white h-screen overflow-hidden vscode wrapper">
      <div className="w-1/2 flex flex-col justify-center relative wrapper-left">
        <div className="bg-gray-800 w-full h-full absolute"></div>
        <img
          src={require("../../assets/code.png")}
          alt="Code"
          className="absolute"
          style={{ left: "0" }}
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center relative wrapper-right">
        <div className="w-4/5">
          <h1 className="font-black text-gray-800 text-6xl">
            Integrates with VSCode
          </h1>
          <p className="text-4xl text-gray-700 mt-6">
            Save your code by highlighting and let Kanlen do the rest for you.
            It’ll save your hightlighted snippet to your Kanlen profile.
          </p>

          <p className="text-4xl text-gray-700 mt-6">
            Looking for a piece of code? Just use the integrated explorer to
            find any snippets saved to your profile and let VSCode copy it into
            your editor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VSCode;
