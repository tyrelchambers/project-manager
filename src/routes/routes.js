import axios from "axios";
import React from "react";
import { getAxios } from "../api";
import Account from "../pages/Account/Account";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import EnvVars from "../pages/EnvVars/EnvVars";
import EnvVarShow from "../pages/EnvVarShow/EnvVarShow";
import ForgotEnvPassword from "../pages/ForgotEnvPassword/ForgotEnvPassword";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Home from "../pages/Home/Home";
import Integrations from "../pages/Integrations/Integrations";
import LikedPosts from "../pages/LikedPosts/LikedPosts";
import Login from "../pages/Login/Login";
import NewEnvVar from "../pages/NewEnvVar/NewEnvVar";
import NewPackage from "../pages/NewPackage/NewPackage";
import NewSnippet from "../pages/NewSnippet/NewSnippet";
import Notifications from "../pages/Notifications/Notifications";
import PackageShow from "../pages/PackageShow/PackageShow";
import PackagesPage from "../pages/PackagesPage/PackagesPage";
import Post from "../pages/Post/Post";
import Profile from "../pages/Profile/Profile";
import ProfileSetup from "../pages/ProfileSetup/ProfileSetup";
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
    slug: "/login",
    component: Login,
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
  {
    slug: "/callback/signup",
    render: async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      const access_token = await getAxios({
        url: "/github/access_token/public",
        params: {
          code,
        },
      }).then((res) => res.access_token);

      const githubUser = await axios
        .get("https://api.github.com/user", {
          headers: {
            Authorization: `token ${access_token}`,
            Accept: "application/vnd.github.v3+json",
          },
        })
        .then((res) => res.data);

      await getAxios({
        url: "/auth/signup",
        method: "post",
        data: {
          githubId: githubUser.id,
          access_token,
        },
      }).then((res) => {
        if (res.token) {
          window.localStorage.setItem("token", res.token);
        }
      });

      await getAxios({
        url: "/user/update",
        method: "post",
        data: {
          state: {
            bio: githubUser.bio,
            name: githubUser.name || githubUser.login,
            twitter: githubUser.twitter_username,
            avatar: githubUser.avatar_url,
          },
        },
      });

      window.location.search = "";
      window.location.pathname = "/";

      return null;
    },
  },
  {
    slug: "/callback/login",
    render: async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        const access_token = await getAxios({
          url: "/github/access_token/public",
          params: {
            code,
          },
        }).then((res) => res.access_token);

        const githubUser = await axios
          .get("https://api.github.com/user", {
            headers: {
              Authorization: `token ${access_token}`,
              Accept: "application/vnd.github.v3+json",
            },
          })
          .then((res) => res.data);

        await getAxios({
          url: "/auth/login",
          method: "post",
          data: {
            githubId: githubUser.id,
            access_token,
          },
        }).then((res) => {
          if (res.token) {
            window.localStorage.setItem("token", res.token);
          }
        });

        window.location.pathname = "/";
        return null;
      } catch (error) {
        console.log(error);
      }
    },
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
    slug: "/snippet/new",
    component: NewSnippet,
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
    slug: "/envs/:env_uuid",
    component: EnvVarShow,
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
  {
    slug: "/reset_environment_password",
    component: ForgotEnvPassword,
  },
  {
    slug: "/profile_setup",
    component: ProfileSetup,
  },
];
