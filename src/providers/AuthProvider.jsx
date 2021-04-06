import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { getAxios } from "../api";
import {
  followToast,
  heartToast,
} from "../components/NotificationToasts/NotificationToasts";
import activeRoutes from "../routes/routes";
import { socket } from "../index";
import { toast } from "react-toastify";

const AuthProvider = ({ stores }) => {
  const history = useHistory();

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/user/me",
      }).then((res) => {
        if (res.user) {
          stores.UserStore.setUser(res.user);
          if (!res.user.username) {
            history.push("/profile_setup");
            toast.warn("Please finish setting up your account");
          }
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
