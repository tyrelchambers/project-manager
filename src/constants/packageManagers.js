import React from "react";
import { Fw } from "./frameworks";
const iconStyle = `mr-4 text-xl`;

export const packageManagers = [
  new Fw({
    framework: "NPM",
    icon: <i className={`fab fa-react  text-blue-400 ${iconStyle}`}></i>,
  }),
  new Fw({
    framework: "Yarn",
    icon: <i className={`fab fa-yarn  text-blue-400 ${iconStyle}`}></i>,
  }),
];
