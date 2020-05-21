import React from "react";
import { connect } from "react-redux";

import ApplicantMainPage from "../ApplicantMainPage";
import "./dashboard.scss";
import { saveUser } from "../../services/firebase/user";

const Dashboard = ({ mode, userData }) => {
  // const newUserData = { ...userData, name: "Ridvan" };
  // // use await when you use real place
  // saveUser(newUserData);

  return (
    <>
      <ApplicantMainPage />
    </>
  );
};

const mapStateToProps = ({ applicationReducer, authReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
    userData: authReducer.userData,
  };
};
export default connect(mapStateToProps)(Dashboard);
