import React from "react";
import Status from "../Status/Status";
import "./Social.css";
const Social = ({ icons }) => {
  return (
    <div className="flex social-icon-wrapper">
      <div className="m-2">
        <Status
          icon={<i className="fab fa-twitter text-white mr-4"></i>}
          text="Share to Twitter"
          wrapperClass="bg-blue-500"
        />
      </div>

      <div className="mt-2">
        <Status
          icon={<i className="fab fa-facebook-square text-white mr-4"></i>}
          text="Share to Facebook"
          wrapperClass="bg-blue-600"
        />
      </div>
    </div>
  );
};

export default Social;
