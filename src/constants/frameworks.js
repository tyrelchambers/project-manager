import React from "react";

const iconStyle = `mr-4 text-xl`;

export function Select({ label, icon, install, framework }) {
  this.label = label;
  this.icon = icon;
  this.install = install;
  this.framework = framework;
}

export const frameworks = [
  new Select({
    label: "Create React App",
    framework: "Create React App",
    icon: <i className={`fab fa-react  text-blue-400 ${iconStyle}`}></i>,
    install: "npx create-react-app",
  }),
  new Select({
    label: "Vue",
    framework: "Vue",
    icon: <i className={`fab fa-vuejs text-green-500 ${iconStyle}`}></i>,
    install: "vue create",
  }),
];

export const packagePrefs = [
  new Select({
    label: "NPM",
    framework: "npm",
    icon: <i className={`fab fa-npm text-red-500 ${iconStyle}`}></i>,
  }),

  new Select({
    label: "Yarn",
    framework: "yarn",
    icon: <i className={`fab fa-yarn text-blue-400 ${iconStyle}`}></i>,
  }),
];
