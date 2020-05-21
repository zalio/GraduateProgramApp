import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import CustomCard from "./CustomCard";
import "./announcements.scss";
import { Button } from "@material-ui/core";

const Announcements = ({ mode }) => {
  const history = useHistory();
  const buttonRender = () => {
    return (
      <Button
        id="apply-button"
        className={mode}
        onClick={() =>
          history.push({
            pathname: "apply",
            state: { id: 2 },
          })
        }
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
        <Button
          id="show-all-button"
          className={mode}
          onClick={() => history.push("/announcements")}
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
