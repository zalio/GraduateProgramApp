import React, { useState, useEffect } from "react";
import "./assets/styles/App.scss";
import Content from "./Content.js";
import LoadingScreen from "../components/reusable/LoadingScreen";
import Login from "../pages/Login";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Register from "../pages/Register";

import { themeChanger } from "../store/actions/application";

const App = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userFromLS = localStorage.getItem("userData");
    if (userFromLS === null) {
      setIsLoading(false);
    } else {
      setUserData("token");
      setIsLoading(false);
    }
  }, []);

  const themeButton = () => (
    <Button
      id="theme-button"
      variant="contained"
      onClick={() => props.themeChanger()}
    >
      OPEN {props.mode === "light" ? "DARK" : "LIGHT"} MODE
    </Button>
  );

  const renderItem = () => {
    if (isLoading) return <LoadingScreen />;
    else if (!userData)
      return (
        <div>
          {themeButton()}
          <Login />
        </div>
      );
    return (
      <div>
        {themeButton()}
        <Content isSignIned={userData !== null} />
      </div>
    );
  };
  return <div className="App">{renderItem()}</div>;
};

const mapStateToProps = ({ applicationReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
  };
};

const mapDispatchToProps = {
  themeChanger,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
