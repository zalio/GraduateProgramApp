import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import CustomCard from "./CustomCard";
import "./announcements.scss";
import { Button } from "@material-ui/core";

const Announcements = ({ mode, title, type, data, route }) => {
  const history = useHistory();
  return (
    <>
      <div>
        <p>{title}</p>
        <div id="announcements-part">
          {data.map((d) => (
            <CustomCard type="announcement" data={d} />
          ))}
        </div>
        <Button
          id="show-all-button"
          className={mode}
          onClick={() => history.push(route)}
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

export default connect(mapStateToProps)(Announcements);
