import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import CustomCard from "./CustomCard";
import "./notifications.scss";
import { Button } from "@material-ui/core";

const Notifications = ({ mode }) => {
  const history = useHistory();
  return (
    <>
      <div>
        <p>Notifications</p>
        <div id="notifications-part">
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
        </div>
        <Button
          id="show-all-button"
          className={mode}
          onClick={() => history.push("/notifications")}
        >
          SHOW ALL
        </Button>
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
export default connect(mapStateToProps)(Notifications);
