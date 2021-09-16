import React from "react";

export const unauthenticatedRoutes = [
  {
    label: "Sign up",
    url: "/signup",
    icon: <i className="fas fa-user-tie"></i>,
  },
  {
    label: "Login",
    url: "/login",
    icon: <i className="fas fa-sign-in-alt"></i>,
  },
];

export const navRoutes = [
  {
    label: "Home",
    url: "/",
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "CLI",
    url: "/projects",
    icon: <i className="fas fa-folder"></i>,
  },

  {
    label: "Code Snippets",
    url: "/snippets",
    icon: <i className="fas fa-code"></i>,
  },
  {
    label: "Environment Variables",
    url: "/env",
    icon: <i className="fas fa-lock"></i>,
  },
  {
    label: "Settings",
    url: "/#",
    icon: <i className="fas fa-cog"></i>,
    subnav: [
      {
        label: "Profile",
        icon: <i className="fas fa-user"></i>,
        url: "/settings/profile",
      },
      {
        label: "Account",
        icon: <i className="fas fa-user-lock"></i>,
        url: "/settings/account",
      },
      {
        label: "Integrations",
        icon: <i className="fas fa-rocket"></i>,
        url: "/settings/integrations",
      },
      {
        label: "Sign Out",
        icon: <i className="fas fa-sign-out-alt"></i>,
        url: "/signout",
      },
    ],
  },
  {
    label: "Info",
    url: "/#",
    icon: <i className="fas fa-info-circle"></i>,
    subnav: [
      // {
      //   label: "Terms of Service",
      //   icon: <i className="fas fa-file-contract"></i>,
      //   url: "/tos",
      // },
      // {
      //   label: "Privacy Policy",
      //   icon: <i className="fas fa-eye-slash"></i>,
      //   url: "/privacy-policy",
      // },
      {
        label: "Contact Us",
        icon: <i className="fas fa-phone"></i>,
        url: "/contact-us",
      },
    ],
  },
];
