import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Dashboard from '../pages/Dashboard';
import Login from "../pages/Login";
import Register from '../pages/Register';
import NoRoute from '../pages/NoRoute';

const Content = ({isSignIned}) => {
    const location = useLocation();
    return (
        <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Register} />
            <Route component={NoRoute} />
        </Switch>
    );
};

export default Content;
