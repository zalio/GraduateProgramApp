import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import NoRoute from "../pages/NoRoute";

const Content = ({ isSignIned }) => {
  const location = useLocation();

  return (
    <Switch location={location} key={location.pathname}>
      <Route exact path="/" component={isSignIned ? Dashboard : Login} />
      <Route exact path="/dashboard" component={isSignIned ? Dashboard : Login} />
      <Route exact path="/register" component={isSignIned ? Dashboard : Register} />
      <Route exact path="/forgot-password" component={isSignIned ? Dashboard : ForgotPassword} />
      <Route component={NoRoute} />
    </Switch>
  );
};

export default Content;
