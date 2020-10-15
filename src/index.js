import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BASE, UNAUTHENTICATED_BASE } from "./routes/routes";
import Home from "./pages/Home/Home";
import "./assets/main.css";
import Signup from "./pages/Signup/Signup";

const Unauthenticated = () => (
  <Route exact path={UNAUTHENTICATED_BASE} component={Signup} />
);

const Authenticated = () => <Route exact path={BASE} component={Home} />;

const App = () => {
  const token =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token") ||
    false;

  return token ? <Authenticated /> : <Unauthenticated />;
};
ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
      <Switch>
        <App />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
