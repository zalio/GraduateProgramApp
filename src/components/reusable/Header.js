import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./header.scss";
import { SESSION_STORAGE_KEY } from "../../pages/Login";
import { clearUserData } from "../../store/actions/auth";
import Link from "@material-ui/core/Link";
import progLogo from "../../app/assets/images/proglogo.png";
import progLogoLight from "../../app/assets/images/proglogo-light.png";

const Header = ({ themeButton, clearUserData, loading, mode, userData }) => {
  const history = useHistory();
  const { name } = userData;

  const onExitPress = async () => {
    clearUserData();
    localStorage.removeItem(SESSION_STORAGE_KEY);
    history.push("/");
  };
  return (
    <AppBar id="header-bar" position="static" className={mode}>
      <Toolbar>
        <div id="header-upper-container" className={mode}>
          <Link
            id="header-logo-link"
            onClick={() => history.push("/")}
            className={mode}
          >
            <img
              id="header-logo"
              src={mode === "light" ? progLogo : progLogoLight}
              alt=""
            />
          </Link>
        </div>
        <div id="header-bottom-container">
          <div>
            <Typography variant="h6">{`Hoşgeldin ${name}`}</Typography>
          </div>
          {themeButton()}
          <Button
            id="exit-button"
            className={mode}
            variant="contained"
            onClick={() => history.push("/make-announcement")}
          >
            <b>MAKE ANNOUNCEMENT</b>
          </Button>
          <Button
            id="exit-button"
            className={mode}
            variant="contained"
            onClick={() => history.push("/send-notification")}
          >
            <b>SEND NOTIFICATION</b>
          </Button>
          <Button
            id="exit-button"
            className={mode}
            variant="contained"
            onClick={() => history.push("/edit-profile")}
          >
            <b>EDIT PROFILE</b>
          </Button>
          <Button
            id="exit-button"
            className={mode}
            variant="contained"
            onClick={onExitPress}
          >
            <b>EXIT</b>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ authReducer, applicationReducer }) => {
  const { loading, userData } = authReducer;
  const { mode } = applicationReducer;
  return {
    loading,
    mode,
    userData,
  };
};

const mapDispatchToProps = {
  clearUserData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
