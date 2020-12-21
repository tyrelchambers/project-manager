import Home from "../pages/Home/Home";
import NewPackage from "../pages/NewPackage/NewPackage";
import NewProject from "../pages/NewProject/NewProject";
import PackageShow from "../pages/PackageShow/PackageShow";
import PackagesPage from "../pages/PackagesPage/PackagesPage";
import Projects from "../pages/Projects/Projects";
import Signup from "../pages/Signup/Signup";
import SnippetEdit from "../pages/SnippetEdit/SnippetEdit";
import Snippets from "../pages/Snippets/Snippets";
import SnippetShow from "../pages/SnippetShow/SnippetShow";

export const UNAUTHENTICATED_BASE = {
  slug: "/",
  component: Signup,
};

export default [
  {
    slug: "/",
    component: Home,
  },
  {
    slug: "/project/new",
    component: NewProject,
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
    slug: "/snippets/:snippet_id",
    component: SnippetShow,
  },
  {
    slug: "/snippets/:snippet_id/edit",
    component: SnippetEdit,
  },
];
