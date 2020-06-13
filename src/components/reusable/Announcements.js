import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import CustomCard from "./CustomCard";
import "./announcements.scss";
import { Button } from "@material-ui/core";

const Announcements = ({ mode, title, type, data, route }) => {
  const history = useHistory();
  console.log(data);
  return (
    <>
      <div>
        <p>{title}</p>
        {data.filter((d) => moment(d.deadline).valueOf() > moment().valueOf())
          .length !== 0 ? (
          <>
            <div id="announcements-part">
              {data
                .filter(
                  (d) => moment(d.deadline).valueOf() > moment().valueOf()
                )
                .map((d) => (
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
          </>
        ) : (
          <div>There is no Announcement!</div>
        )}
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
