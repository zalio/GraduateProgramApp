import React, { useState, useEffect } from "react";
import "./assets/styles/App.scss";
import Content from "./Content.js";
import LoadingScreen from "../components/reusable/LoadingScreen";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { themeChanger } from "../store/actions/application";
import { loginRequest, loginSuccess, loginFail } from "../store/actions/auth";
import { SESSION_STORAGE_KEY } from "../pages/Login";

const App = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.loginRequest();
    const userFromLS = localStorage.getItem(SESSION_STORAGE_KEY);
    if (userFromLS === null) {
      setIsLoading(false);
      props.loginFail();
    } else {
      props.loginSuccess(userFromLS);
      setIsLoading(false);
    }
  }, [props.userData]);

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
    return (
      <div>
        {themeButton()}
        <Content isSignIned={props.userData !== null} />
      </div>
    );
  };
  return <div className="App">{renderItem()}</div>;
};

const mapStateToProps = ({ authReducer, applicationReducer }) => {
  const { mode } = applicationReducer;
  const { userData } = authReducer;
  return {
    mode,
    userData,
  };
};

const mapDispatchToProps = {
  themeChanger,
  loginSuccess,
  loginRequest,
  loginFail,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
