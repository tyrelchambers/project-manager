import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import activeRoutes from "./routes/routes";
import "./assets/main.css";
import Signup from "./pages/Signup/Signup";
import { Provider } from "mobx-react";
import stores from "./stores/index";
import ModalContainer from "./layouts/ModalContainer/ModalContainer";
import { getAxios } from "./api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UNAUTHENTICATED_BASE } from "./routes/routes";
const Unauthenticated = () => (
  <Route exact path={UNAUTHENTICATED_BASE} component={Signup} />
);
const Authenticated = () =>
  activeRoutes.map((route, id) => (
    <Route
      key={id}
      exact
      path={route.slug}
      component={route.component}
      render={route.render}
    />
  ));

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
        <ToastContainer />
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
