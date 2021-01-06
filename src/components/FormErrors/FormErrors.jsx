import React from "react";

const FormErrors = ({ error }) => {
  if (!error) {
    return null;
  }
  console.log(error);
  return (
    <div className="bg-red-500 p-3 rounded-md flex items-center mt-4">
      <p className="text-gray-200 font-bold mr-4 text-lg">Hey, hey!</p>
      <p className="text-gray-200">{error.message}</p>
    </div>
  );
};

export default FormErrors;
