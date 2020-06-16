import React, { useEffect } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Notifications from "../../components/reusable/Notifications";
import Announcements from "../../components/reusable/Announcements";
import LoadingScreen from "../../components/reusable/LoadingScreen";

const GradSchoolMainPage = ({
  mode,
  announcements,
  notifications,
  announcementsIsLoading,
  notificationsIsLoading,
}) => {
  return (
    <>
      <div id="dashboard" className={mode}>
        <Container className={mode}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              {!announcementsIsLoading ? (
                <Announcements
                  title="Announcements"
                  type="announcements"
                  data={announcements.slice(0, 4)}
                  route="announcements"
                />
              ) : (
                <LoadingScreen />
              )}
            </Grid>
            <Grid item xs={5}>
              {!notificationsIsLoading ? (
                <Notifications
                  title="Notifications"
                  type="notifications"
                  data={notifications.slice(0, 4)}
                  route="notifications"
                />
              ) : (
                <LoadingScreen />
              )}
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
export default connect(mapStateToProps)(GradSchoolMainPage);
