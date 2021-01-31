import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="p-10 bg-gray-800 flex justify-center">
      <div className="w-full max-w-xl flex justify-center">
        <Link
          to="/signup"
          className="bg-pink-500 pl-4 pr-4 pt-3 pb-3 font-bold text-center rounded-lg"
        >
          Get started with Kanlen
        </Link>
      </div>
    </div>
  );
};

export default CTA;
