import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BASE } from "./routes/routes";
import Home from "./pages/Home/Home";
import "./assets/main.css";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
      <Switch>
        <Route exact path={BASE} component={Home} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
