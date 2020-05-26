import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import CustomCard from "./CustomCard";
import "./notifications.scss";
import { Button } from "@material-ui/core";

const Notifications = ({ mode, title, type, data, route }) => {
  const history = useHistory();
  return (
    <>
      <div>
        <p>{title}</p>
        {data.length !== 0 ? (
          <>
            <div id="notifications-part">
              {data.map((d) => (
                <CustomCard type="notifications" data={d} />
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
          <div>There is no Notification!</div>
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
export default connect(mapStateToProps)(Notifications);
