import React from "react";
import { connect } from "react-redux";
import CustomCard from "../../components/reusable/CustomCard";
import Container from "@material-ui/core/Container";
import "./announcements.scss";
import moment from "moment";

const Announcements = ({ mode, announcements }) => {
  const check = (data) => {
    if (!data.deadline) {
      return true;
    } else if (moment(data.deadline).valueOf() > moment().valueOf()) {
      return true;
    }
    return false;
  };
  return (
    <div id="cards-page">
      <Container className={mode}>
        <div id="cards-page-upper-text" className={mode}>
          <h1>
            <b>Announcements</b>
          </h1>
        </div>
        <div id="announcements-part">
          {announcements.filter((d) => check(d)).length !== 0 ? (
            announcements
              .filter((d) => check(d))
              .map((d) => <CustomCard type="announcement" data={d} />)
          ) : (
            <div>There is no announcement yet!</div>
          )}
        </div>
      </Container>
    </div>
  );
};
const mapStateToProps = ({ applicationReducer }) => {
  const { mode, announcements } = applicationReducer;
  return {
    mode,
    announcements,
  };
};
export default connect(mapStateToProps)(Announcements);
