import React from "react";

import Account from "../pages/Account/Account";
import DownloadFile from "../pages/DownloadFile/DownloadFile";
import EditEnvVar from "../pages/EditEnvVar/EditEnvVar";
import EnvVars from "../pages/EnvVars/EnvVars";
import EnvVarShow from "../pages/EnvVarShow/EnvVarShow";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NewEnvVar from "../pages/NewEnvVar/NewEnvVar";
import NewPackage from "../pages/NewPackage/NewPackage";
import PackageShow from "../pages/PackageShow/PackageShow";
import PackagesPage from "../pages/PackagesPage/PackagesPage";
import Profile from "../pages/Profile/Profile";
import ProfileSetup from "../pages/ProfileSetup/ProfileSetup";
import Projects from "../pages/Projects/Projects";
import Signup from "../pages/Signup/Signup";
import SnippetEdit from "../pages/SnippetEdit/SnippetEdit";
import Snippets from "../pages/Snippets/Snippets";
import SnippetShow from "../pages/SnippetShow/SnippetShow";

const sharedRoutes = [
  {
    slug: "/snippets/:snippet_uuid",
    component: SnippetShow,
  },
];

export const UNAUTHENTICATED = [
  ...sharedRoutes,
  {
    slug: "/signup",
    component: Signup,
  },
  {
    slug: "/login",
    component: Login,
  },
];

export default [
  ...sharedRoutes,
  {
    slug: "/",
    component: Home,
  },
  {
    slug: "/packages",
    component: PackagesPage,
  },
  {
    slug: "/packages/new",
    component: NewPackage,
  },
  {
    slug: "/projects",
    component: Projects,
  },
  {
    slug: "/package/:package_id",
    component: PackageShow,
  },
  {
    slug: "/snippets",
    component: Snippets,
  },

  {
    slug: "/snippets/:snippet_uuid/edit",
    component: SnippetEdit,
  },
  {
    slug: "/env",
    component: EnvVars,
  },
  {
    slug: "/env/new",
    component: NewEnvVar,
  },
  {
    slug: "/env/:env_name",
    component: EnvVarShow,
  },
  {
    slug: "/env/:env_name/edit",
    component: EditEnvVar,
  },
  {
    slug: "/settings/account",
    component: Account,
  },
  {
    slug: "/settings/profile",
    component: Profile,
  },
  {
    slug: "/profile/setup",
    component: ProfileSetup,
  },
  {
    slug: "/signout",
    render: () => {
      window.localStorage.removeItem("token");
      window.sessionStorage.removeItem("token");
      window.location.pathname = "/";
    },
  },
];
