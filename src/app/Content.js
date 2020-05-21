import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import EditProfile from "../pages/EditProfile";
import Announcements from "../pages/Announcements";
import Notifications from "../pages/Notifications";
import Apply from "../pages/Apply";
import NoRoute from "../pages/NoRoute";

const Content = ({ isSignIned }) => {
  const location = useLocation();

  return (
    <Switch location={location} key={location.pathname}>
      <Route exact path="/" component={isSignIned ? Dashboard : Login} />
      <Route
        exact
        path="/dashboard"
        component={isSignIned ? Dashboard : Login}
      />
      <Route
        exact
        path="/register"
        component={isSignIned ? Dashboard : Register}
      />
      <Route
        exact
        path="/forgot-password"
        component={isSignIned ? Dashboard : ForgotPassword}
      />
      <Route
        exact
        path="/edit-profile"
        component={isSignIned ? EditProfile : Login}
      />
      <Route
        exact
        path="/announcements"
        component={isSignIned ? Announcements : Login}
      />
      <Route
        exact
        path="/notifications"
        component={isSignIned ? Notifications : Login}
      />
      <Route exact path="/apply" component={isSignIned ? Apply : Login} />
      <Route component={NoRoute} />
    </Switch>
  );
};

export default Content;
