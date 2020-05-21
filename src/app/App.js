import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./assets/styles/App.scss";
import Content from "./Content.js";
import LoadingScreen from "../components/reusable/LoadingScreen";
import Button from "@material-ui/core/Button";
import { themeChanger } from "../store/actions/application";
import { loginRequest, loginSuccess, loginFail } from "../store/actions/auth";
import { SESSION_STORAGE_KEY } from "../pages/Login";
import Header from "../components/reusable/Header";

import { getUser } from "../services/firebase/user";
import dayModeIcon from "./assets/images/day-moon.png";
import nightModeIcon from "./assets/images/night-moon.png";

const App = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const saveUserDataToRedux = async (userFromLS) => {
    const userData = await getUser(userFromLS);
    props.loginSuccess(userData);
    setIsLoading(false);
  };

  useEffect(() => {
    props.loginRequest();
    const userFromLS = localStorage.getItem(SESSION_STORAGE_KEY);
    if (userFromLS === null) {
      setIsLoading(false);
      props.loginFail();
    } else {
      saveUserDataToRedux(userFromLS);
    }
  }, []);

  const themeButton = () => (
    <Button
      id={props.userData === null ? "theme-button" : "theme-button-signed-in"}
      variant="contained"
      onClick={() => props.themeChanger()}
      className={props.mode}
    >
      <img
        id="theme-button-img"
        className={props.mode}
        src={props.mode === "light" ? dayModeIcon : nightModeIcon}
        alt=""
      />
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
  return <div className={"App" + ` ${props.mode}`}>{renderItem()}</div>;
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
