import React from "react";
import { connect } from "react-redux";
import CustomCard from "../../components/reusable/CustomCard";
import Container from "@material-ui/core/Container";
import "./announcements.scss";

const Announcements = ({ mode, announcements }) => {
  return (
    <div id="cards-page">
      <Container className={mode}>
        <div id="cards-page-upper-text" className={mode}>
          <h1>
            <b>Announcements</b>
          </h1>
        </div>
        <div id="announcements-part">
          {announcements.length !== 0 ? (
            announcements.map((d) => (
              <CustomCard type="announcement" data={d} />
            ))
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
