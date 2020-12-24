import EditEnvVar from "../pages/EditEnvVar/EditEnvVar";
import EnvVars from "../pages/EnvVars/EnvVars";
import EnvVarShow from "../pages/EnvVarShow/EnvVarShow";
import Home from "../pages/Home/Home";
import NewEnvVar from "../pages/NewEnvVar/NewEnvVar";
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
    slug: "/snippets/:snippet_name",
    component: SnippetShow,
  },
  {
    slug: "/snippets/:snippet_name/edit",
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
];
