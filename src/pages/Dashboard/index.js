import React from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Notifications from "../../components/reusable/Notifications";
import Announcements from "../../components/reusable/Announcements";
import "./dashboard.scss";

const Dashboard = ({ mode }) => {
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

const mapStateToProps = ({ applicationReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
  };
};
export default connect(mapStateToProps)(Dashboard);
