import React from "react";
import { getAxios } from "../api";
import Account from "../pages/Account/Account";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import EditEnvVar from "../pages/EditEnvVar/EditEnvVar";
import EnvVars from "../pages/EnvVars/EnvVars";
import EnvVarShow from "../pages/EnvVarShow/EnvVarShow";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Home from "../pages/Home/Home";
import Integrations from "../pages/Integrations/Integrations";
import LikedPosts from "../pages/LikedPosts/LikedPosts";
import Login from "../pages/Login/Login";
import NewEnvVar from "../pages/NewEnvVar/NewEnvVar";
import NewPackage from "../pages/NewPackage/NewPackage";
import Notifications from "../pages/Notifications/Notifications";
import PackageShow from "../pages/PackageShow/PackageShow";
import PackagesPage from "../pages/PackagesPage/PackagesPage";
import Post from "../pages/Post/Post";
import Profile from "../pages/Profile/Profile";
import Projects from "../pages/Projects/Projects";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Signup from "../pages/Signup/Signup";
import SnippetEdit from "../pages/SnippetEdit/SnippetEdit";
import Snippets from "../pages/Snippets/Snippets";
import SnippetShow from "../pages/SnippetShow/SnippetShow";
import Index from "../pages/Static/Index";
import UserShowPage from "../pages/UserShowPage/UserShowPage";

const sharedRoutes = [
  {
    slug: "/snippets/:snippet_uuid",
    component: SnippetShow,
  },
  {
    slug: "/user/:user_id",
    component: UserShowPage,
  },
  {
    slug: "/login",
    component: Login,
  },
  {
    slug: "/post/:post_id",
    component: Post,
  },
];

export const UNAUTHENTICATED = [
  ...sharedRoutes,
  {
    slug: "/signup",
    component: Signup,
  },
  {
    slug: "/",
    component: Index,
  },
  {
    slug: "/forgot_password",
    component: ForgotPassword,
  },
  {
    slug: "/reset",
    component: ResetPassword,
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
    slug: "/signout",
    render: () => {
      window.localStorage.removeItem("token");
      window.sessionStorage.removeItem("token");
      window.location.pathname = "/";
    },
  },
  {
    slug: "/bookmarks",
    component: Bookmarks,
  },
  {
    slug: "/likes",
    component: LikedPosts,
  },
  {
    slug: "/notifications",
    component: Notifications,
  },
  {
    slug: "/settings/integrations",
    component: Integrations,
  },
  {
    slug: "/callback",
    render: async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      await getAxios({
        url: "/github/access_token",
        params: {
          code,
        },
      }).then((res) => {
        if (res) {
          window.close();
        }
      });
    },
  },
];
