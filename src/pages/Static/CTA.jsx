import React from "react";
import { MainButton } from "../../components/Buttons/Buttons";
const CTA = () => {
  return (
    <div className="p-10 bg-gray-800 flex justify-center">
      <div className="w-full max-w-xl">
        <MainButton default>Get started with Kanlen</MainButton>
      </div>
    </div>
  );
};

export default CTA;
