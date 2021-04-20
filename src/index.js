import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/main.css";
import { Provider } from "mobx-react";
import stores from "./stores/index";
import ModalContainer from "./layouts/ModalContainer/ModalContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UNAUTHENTICATED } from "./routes/routes";
import { io } from "socket.io-client";
import AuthProvider from "./providers/AuthProvider";
import { config } from "./config/config";

export const socket = io(config[process.env.NODE_ENV].backend, {
  transportOptions: {
    polling: {
      extraHeaders: {
        token:
          window.localStorage.getItem("token") ||
          window.sessionStorage.getItem("token") ||
          false,
      },
    },
  },
});

const Unauthenticated = () =>
  UNAUTHENTICATED.map((route, id) => (
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
  return token ? <AuthProvider stores={stores} /> : <Unauthenticated />;
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
