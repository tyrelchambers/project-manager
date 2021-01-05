import React from "react";
import { Select } from "./frameworks";
const iconStyle = `mr-4 text-xl`;

export const packageManagers = [
  new Select({
    framework: "NPM",
    icon: <i className={`fab fa-react  text-blue-400 ${iconStyle}`}></i>,
  }),
  new Select({
    framework: "Yarn",
    icon: <i className={`fab fa-yarn  text-blue-400 ${iconStyle}`}></i>,
  }),
];
