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
        <div>
          <Typography variant="h6">{`Hoşgeldin ${name}`}</Typography>
        </div>
        <div>
          {themeButton()}
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
