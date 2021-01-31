import React from "react";

const Footer = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center h-screen">
      <div className="w-4/5">
        <h1 className="font-black text-gray-800 text-6xl">
          If you made it this far, thank you.
        </h1>
        <p className="text-4xl text-gray-700 mt-6">
          I love creating applications that someone might find useful. I’m a
          self-taught developer through-and-through! Give me some good tunes, a
          good idea and a laptop that functions, and I’ll make you something
          cool.
        </p>

        <p className="text-4xl text-gray-700 mt-6">
          I hope you will enjoy your stay on Kanlen. I hope you’re able to learn
          something new. I hope that your developer experience is just a little
          bit easier. Godspeed!
        </p>

        <p className="font-bold text-gray-800 text-3xl mt-10">
          - Tyrel Chambers
        </p>
        <p className="text-pink-500 font-bold text-xl">Creator of Kanlen</p>
      </div>
    </div>
  );
};

export default Footer;
