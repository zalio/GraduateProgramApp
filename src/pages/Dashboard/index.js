import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import {
  registerRequest,
  registerSuccess,
  clearUserData,
} from "../../store/actions/auth";
import { SESSION_STORAGE_KEY } from "../Login";

import "./dashboard.scss";

const Dashboard = ({ clearUserData }) => {
  const history = useHistory();

  const onExitPress = async () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    clearUserData();
    history.push("/");
  };

  return (
    <>
      <div>Welcome to dashboard</div>
      <Button
        style={{
          marginTop: 50,
          backgroundColor: "red",
        }}
        variant="contained"
        onClick={onExitPress}
      >
        <b style={{ color: "#FFFFFF" }}> EXIT</b>
      </Button>
    </>
  );
};

const mapStateToProps = ({ authReducer }) => {
  const { loading } = authReducer;
  return { loading };
};

const mapDispatchToProps = {
  registerRequest,
  registerSuccess,
  clearUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
