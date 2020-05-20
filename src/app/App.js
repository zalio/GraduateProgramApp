import React, { useState, useEffect } from "react";
import "./assets/styles/App.scss";
import Content from "./Content.js";
import LoadingScreen from "../components/reusable/LoadingScreen";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { themeChanger } from "../store/actions/application";
import { loginRequest, loginSuccess, loginFail } from "../store/actions/auth";
import { SESSION_STORAGE_KEY } from "../pages/Login";
import Header from "../components/reusable/Header";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness7Icon from "@material-ui/icons/Brightness7";

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
      id={props.userData === null ? "theme-button" : "theme-button-signed-in"}
      variant="contained"
      onClick={() => props.themeChanger()}
      className={props.mode}
    >
      {props.mode === "light" ? <Brightness5Icon /> : <Brightness7Icon />}
    </Button>
  );

  const renderItem = () => {
    if (isLoading) return <LoadingScreen />;
    return (
      <div>
        {props.userData === null ? (
          themeButton()
        ) : (
          <Header themeButton={themeButton} />
        )}
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
