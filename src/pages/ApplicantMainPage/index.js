import React, { useEffect } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Notifications from "../../components/reusable/Notifications";
import Announcements from "../../components/reusable/Announcements";

const ApplicantMainPage = ({ mode, announcements, notifications }) => {
  return (
    <>
      <div id="dashboard" className={mode}>
        <Container className={mode}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <Announcements
                title="Announcements"
                type="announcements"
                data={announcements}
                route="announcements"
              />
            </Grid>
            <Grid item xs={5}>
              <Notifications
                title="Notifications"
                type="notifications"
                data={notifications}
                route="notifications"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = ({ applicationReducer }) => {
  const { mode, announcements, notifications } = applicationReducer;
  return {
    mode,
    announcements,
    notifications,
  };
};
export default connect(mapStateToProps)(ApplicantMainPage);
