import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  BASE,
  PACKAGES,
  NEW_PROJECT,
  UNAUTHENTICATED_BASE,
  NEW_PACKAGE,
  PROJECTS,
  PACKAGE_SHOW,
} from "./routes/routes";
import Home from "./pages/Home/Home";
import "./assets/main.css";
import Signup from "./pages/Signup/Signup";
import NewProject from "./pages/NewProject/NewProject";
import { Provider } from "mobx-react";
import stores from "./stores/index";
import ModalContainer from "./layouts/ModalContainer/ModalContainer";
import PackagesPage from "./pages/PackagesPage/PackagesPage";
import NewPackage from "./pages/NewPackage/NewPackage";
import Projects from "./pages/Projects/Projects";
import "./assets/prism.css";
import { getAxios } from "./api";
import PackageShow from "./pages/PackageShow/PackageShow";
const Unauthenticated = () => (
  <Route exact path={UNAUTHENTICATED_BASE} component={Signup} />
);

const Authenticated = () => (
  <>
    <Route exact path={BASE} component={Home} />
    <Route exact path={NEW_PROJECT} component={NewProject} />
    <Route exact path={PACKAGES} component={PackagesPage} />
    <Route exact path={NEW_PACKAGE} component={NewPackage} />
    <Route exact path={PROJECTS} component={Projects} />
    <Route exact path={PACKAGE_SHOW} component={PackageShow} />
  </>
);

const App = () => {
  const token =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token") ||
    false;

  useEffect(() => {
    if (token) {
      const fn = async () => {
        await getAxios({
          url: "/user/me",
        }).then((res) => {
          stores.UserStore.setUser(res.user);
        });
      };

      fn();
    }
  }, [token]);

  return token ? <Authenticated /> : <Unauthenticated />;
};
ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <Router basename="/">
        <ModalContainer />
        <Switch>
          <App />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
