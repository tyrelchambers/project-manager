import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { getAxios } from "../api";
import {
  followToast,
  heartToast,
} from "../components/NotificationToasts/NotificationToasts";
import activeRoutes from "../routes/routes";
import { socket } from "../index";

const AuthProvider = ({ stores }) => {
  const history = useHistory();

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/user/me",
      }).then(({ success }) => {
        if (success.user) {
          if (!success.user.username || !success.user.name) {
            history.push("/profile_setup");
          }
          stores.UserStore.setUser(success.user);
        }
      });
    };

    socket.on("notification", (data) => {
      if (data.type === "post_like") {
        heartToast(data.notification);
      }

      if (data.type === "follow") {
        followToast(data.notification);
      }
    });

    fn();
  }, []);

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
