import React from "react";
import { connect } from "react-redux";
import CustomCard from "../../components/reusable/CustomCard";
import Container from "@material-ui/core/Container";

const Notifications = ({ mode }) => {
  return (
    <div id="cards-page">
      <Container className={mode}>
        <div id="cards-page-upper-text" className={mode}>
          <h1>
            <b>Notifications</b>
          </h1>
        </div>
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
      </Container>
    </div>
  );
};
const mapStateToProps = ({ applicationReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
  };
};
export default connect(mapStateToProps)(Notifications);
