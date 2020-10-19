import React from "react";

export const navRoutes = [
  {
    label: "Home",
    url: "/",
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "Projects",
    url: "/projects",
    icon: <i className="fas fa-folder"></i>,
  },
  {
    label: "Defaults",
    url: "/defaults",
    icon: <i className="fab fa-buffer"></i>,
    subnav: [
      {
        label: "NPM",
        icon: <i className="fab fa-npm"></i>,
        url: "/defaults?f=npm",
      },
      {
        label: "Yarn",
        icon: <i className="fab fa-yarn"></i>,
        url: "/defaults?f=yarn",
      },
    ],
  },
];
