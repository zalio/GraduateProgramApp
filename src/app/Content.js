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
import MakeAnnouncement from "../pages/MakeAnnouncement";
import SendNotification from "../pages/SendNotification";
import ViewApplications from "../pages/ViewApplications";
import DisplayFiles from "../pages/DisplayFiles";
import NoRoute from "../pages/NoRoute";
import SendResult from "../pages/SendResult";
import SendResultToGradschool from "../pages/SendResultToGradscool";
import CreateInterview from "../pages/CreateInterview";
import DetermineInterview from "../pages/DetermineInterview";

const Content = ({ isSignedIn, userType }) => {
  const location = useLocation();

  return (
    <Switch location={location} key={location.pathname}>
      <Route exact path="/" component={isSignedIn ? Dashboard : Login} />
      <Route
        exact
        path="/dashboard"
        component={isSignedIn ? Dashboard : Login}
      />
      <Route
        exact
        path="/register"
        component={isSignedIn ? Dashboard : Register}
      />
      <Route
        exact
        path="/forgot-password"
        component={isSignedIn ? Dashboard : ForgotPassword}
      />
      <Route
        exact
        path="/edit-profile"
        component={isSignedIn ? EditProfile : Login}
      />
      <Route
        exact
        path="/announcements"
        component={isSignedIn ? Announcements : Login}
      />
      <Route
        exact
        path="/notifications"
        component={isSignedIn ? Notifications : Login}
      />
      <Route exact path="/apply" component={isSignedIn ? Apply : Login} />
      {userType === "gradschool" ? (
        <Route
          exact
          path="/make-announcement"
          component={isSignedIn ? MakeAnnouncement : Login}
        />
      ) : (
        ""
      )}
      <Route
        exact
        path="/create-interview"
        component={isSignedIn ? CreateInterview : Login}
      />
      {userType !== "applicant" ? (
        <Route
          exact
          path="/view-applications"
          component={isSignedIn ? ViewApplications : Login}
        />
      ) : (
        ""
      )}
      {userType === "department" ? (
        <Route
          exact
          path="/send-result"
          component={isSignedIn ? SendResult : Login}
        />
      ) : (
        ""
      )}
      {userType === "department" ? (
        <Route
          exact
          path="/send-result-to-gradschool"
          component={isSignedIn ? SendResultToGradschool : Login}
        />
      ) : (
        ""
      )}
      <Route
        exact
        path="/display-files"
        component={isSignedIn ? DisplayFiles : Login}
      />
      <Route
        exact
        path="/determine-interview"
        component={isSignedIn ? DetermineInterview : Login}
      />
      {userType !== "applicant" ? (
        <Route
          exact
          path="/send-notification"
          component={isSignedIn ? SendNotification : Login}
        />
      ) : (
        ""
      )}

      <Route component={NoRoute} />
    </Switch>
  );
};

export default Content;
