import React from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Notifications from "../../components/reusable/Notifications";
import Announcements from "../../components/reusable/Announcements";

const ApplicantMainPage = ({ mode }) => {
  return (
    <>
      <div id="dashboard" className={mode}>
        <Container className={mode}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <Announcements />
            </Grid>
            <Grid item xs={5}>
              <Notifications />
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
export default connect(mapStateToProps)(ApplicantMainPage);
