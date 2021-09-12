import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { getAxios } from "../api";
import {
  followToast,
  heartToast,
} from "../components/NotificationToasts/NotificationToasts";
import activeRoutes from "../routes/routes";
import { socket } from "../index";
import { useUser } from "../hooks/useUser";

const AuthProvider = ({ stores }) => {
  const history = useHistory();
  const query = useUser();

  useEffect(() => {
    socket.on("notification", (data) => {
      if (data.type === "post_like") {
        heartToast(data.notification);
      }

      if (data.type === "follow") {
        followToast(data.notification);
      }
    });
  }, []);

  if (query.isSuccess && (!query.data.user.username || !query.data.user.name)) {
    history.push("/profile_setup");
  }

  return (
    <Switch>
      <AuthRoutes />
    </Switch>
  );
};

const AuthRoutes = () =>
  activeRoutes.map((route, id) => (
    <Route
      key={id}
      exact
      path={route.slug}
      component={route.component}
      render={route.render}
    />
  ));

export default AuthProvider;
