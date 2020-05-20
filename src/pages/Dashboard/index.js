import React from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Notifications from "../../components/reusable/Notifications";
import Announcements from "../../components/reusable/Announcements";
import "./dashboard.scss";
import { saveUser } from "../../services/firebase/user";

const Dashboard = ({ mode, userData }) => {
  const newUserData = { ...userData, name: "Ridvan" };
  // use await when you use real place
  saveUser(newUserData);

  return (
    <>
      <div id="dashboard" className={mode}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Notifications />
            </Grid>
            <Grid item xs={6}>
              <Announcements />
            </Grid>
          </Grid>
        </Container>
      </div>
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
