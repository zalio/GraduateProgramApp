import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Dashboard from '../pages/Dashboard';
import NoRoute from '../pages/NoRoute';

const Content = () => {
    const location = useLocation();
    return (
        <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Dashboard} />
            <Route component={NoRoute} />
        </Switch>
    );
};

export default Content;
