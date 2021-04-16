import React from "react";
import "./index.css";
const CLI = () => {
  return (
    <div className="h-screen bg-white overflow-hidden flex flex-col items-center cli wrapper">
      <div className="w-3/5 mt-10 body">
        <p className="uppercase font-bold text-pink-500">
          From idea to creation in 2.2 clicks
        </p>
        <h1 className="font-black text-gray-800 text-6xl">
          Command CLI with Flags!
        </h1>
        <p className="text-4xl text-gray-700 mt-6">
          Generate the perfect CLI command without having to remember the
          syntax, or wondering which flags are available.
        </p>

        <div className="w-full bg-gray-800 rounded-lg p-4 mt-10 flex items-center box-shadow">
          <p className="font-bold text-pink-400 mr-6">$</p>
          <p className="text-white font-bold">
            npx create-react-app my-cool-app --use-npm --template typescript
          </p>
        </div>

        <div className="flex mt-10 cli-options">
          <div className="flex flex-col w-1/2">
            <h3 className="text-gray-700 font-bold">Name</h3>
            <p className="text-4xl text-gray-800">my-cool-app</p>

            <h3 className="text-gray-700 font-bold mt-10">Framework</h3>
            <p className="text-4xl text-gray-800">React</p>
          </div>

          <div className="flex flex-col w-1/2">
            <div className="flex items-center">
              <i className="fas fa-check-square text-pink-500 mr-4"></i>
              <p className="text-gray-800 text-2xl">--use-npm</p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center">
                <i className="fas fa-check-square text-pink-500 mr-4"></i>
                <p className="text-gray-800 text-2xl">--template</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-white font-bold ">typescript</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-20 flex-wrap">
          <div className="flex items-center mr-10">
            <i className="fab fa-react text-blue-500 text-6xl mr-4"></i>
            <p className="text-gray-800 text-4xl font-bold">React</p>
          </div>

          <div className="flex items-center mr-10">
            <i className="fab fa-vuejs text-green-500 text-6xl mr-4"></i>
            <p className="text-gray-800 text-4xl font-bold">Vue</p>
          </div>

          <div className="flex items-center">
            <i className="fab fa-angular text-red-500 text-6xl mr-4"></i>
            <p className="text-gray-800 text-4xl font-bold">Angular</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLI;
