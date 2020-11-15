import React from "react";

const iconStyle = `mr-4 text-xl`;

export function Fw({ framework, icon, install }) {
  this.framework = framework;
  this.icon = icon;
  this.install = install;

  this.command = function ({ appName, flags = "" }) {
    return `${install} ${appName} ${flags}`;
  };
}

export const frameworks = [
  new Fw({
    framework: "Create React App",
    icon: <i className={`fab fa-react  text-blue-400 ${iconStyle}`}></i>,
    install: "npx create-react-app",
  }),
  new Fw({
    framework: "Vue",
    icon: <i className={`fab fa-vuejs text-green-500 ${iconStyle}`}></i>,
    install: "vue create",
  }),
];
