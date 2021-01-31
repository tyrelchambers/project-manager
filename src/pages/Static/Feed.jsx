import React from "react";
import "./index.css";

const Feed = () => {
  return (
    <div className="h-screen overflow-hidden flex justify-center items-center bg-white feed wrapper">
      <div
        className="w-3/5 relative h-full body"
        style={{ maxHeight: "900px" }}
      >
        <div className="flex flex-col absolute z-10" style={{ top: "3em" }}>
          <p className="uppercase font-bold text-pink-500">Personalized feed</p>
          <h1 className="font-black text-gray-800 text-6xl">
            Connect with other developers.
          </h1>
          <p className="text-4xl text-gray-700 mt-6">
            Follow your favourite people. See their code, maybe learn a thing or
            two! Interact with them via liking and bookmarking their posts.
          </p>
        </div>

        <img
          src={require("../../assets/undraw_social_friends_nsbv.svg")}
          alt=""
          className="object-cover w-full max-w-2xl absolute"
          style={{
            right: "3em",
            bottom: "3em",
          }}
        />
      </div>
    </div>
  );
};

export default Feed;
