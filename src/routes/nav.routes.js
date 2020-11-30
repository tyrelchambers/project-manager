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
    label: "Packages",
    url: "/packages",
    icon: <i className="fab fa-buffer"></i>,
    subnav: [
      {
        label: "NPM",
        icon: <i className="fab fa-npm"></i>,
        url: "/packages?f=npm",
      },
      {
        label: "Yarn",
        icon: <i className="fab fa-yarn"></i>,
        url: "/packages?f=yarn",
      },
    ],
  },
  {
    label: "Code Snippets",
    url: "/snippets",
    icon: <i className="fas fa-code"></i>,
  },
  {
    label: "Settings",
    url: "/settings",
    icon: <i className="fas fa-cog"></i>,
    subnav: [
      {
        label: "Profile",
        icon: <i className="fas fa-user"></i>,
        url: "/settings/profile",
      },
    ],
  },
];
