import React from "react";
import { connect } from "react-redux";
import CustomCard from "./CustomCard";
import "./announcements.scss";
import { Button } from "@material-ui/core";

const Announcements = ({ mode }) => {
  const buttonRender = () => {
    return (
      <Button
        id="apply-button"
        className={mode}
        onClick={() => alert("Applied!")}
      >
        Apply!
      </Button>
    );
  };

  return (
    <>
      <div>
        <p>Announcements</p>
        <div id="announcements-part">
          <CustomCard customButton={buttonRender} />
          <CustomCard customButton={buttonRender} />
          <CustomCard customButton={buttonRender} />
          <CustomCard customButton={buttonRender} />
          <CustomCard customButton={buttonRender} />
          <CustomCard customButton={buttonRender} />
          <CustomCard customButton={buttonRender} />
        </div>
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
