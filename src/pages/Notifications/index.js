import React from "react";
import { connect } from "react-redux";
import CustomCard from "../../components/reusable/CustomCard";
import Container from "@material-ui/core/Container";

const Notifications = ({ mode, notifications }) => {
  return (
    <div id="cards-page">
      <Container className={mode}>
        <div id="cards-page-upper-text" className={mode}>
          <h1>
            <b>Notifications</b>
          </h1>
        </div>
        <div id="notifications-part">
          {notifications.map((d) => (
            <CustomCard type="notifications" data={d} />
          ))}
        </div>
      </Container>
    </div>
  );
};
const mapStateToProps = ({ applicationReducer }) => {
  const { mode, notifications } = applicationReducer;
  return {
    mode,
    notifications,
  };
};
export default connect(mapStateToProps)(Notifications);
