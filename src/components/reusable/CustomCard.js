import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "./CustomCard.scss";
import Divider from "@material-ui/core/Divider";
import dayjs from "../../utils/dayjs";
import FileDisplayer from "./FileDisplayer";
import { getUser } from "../../services/firebase/user";

const CustomCard = ({ mode, type, data, userData }) => {
  const history = useHistory();
  const [buttonIconDown, setButtonIconDown] = useState(true);
  const [contentWidthClass, setContentWidthClass] = useState("small");

  const [user, setUser] = useState(null);
  const getSender = async (uid) => {
    const getting = await getUser(uid);
    const { name, surname } = getting;
    setUser(name + " " + surname);
  };
  useEffect(() => {
    getSender(data.senderId);
  }, []);
  useEffect(() => console.log(user, type), [user]);

  const buttonRender = (idToGo) => {
    return (
      <Button
        id="apply-button"
        className={mode}
        onClick={() =>
          history.push({
            pathname: "apply",
            state: { id: idToGo, application: data },
          })
        }
      >
        Apply!
      </Button>
    );
  };

  return (
    <Card className={mode}>
      <CardContent className={mode + ` ${contentWidthClass}`}>
        <div id="card-upper-text-container" className={mode}>
          <div id="card-upper-text-sub-container" className={mode}>
            {type === "notifications" ? (
              <>
                <span>
                  <b>From:</b>
                </span>
                <span>{user !== null ? user : ""}</span>
              </>
            ) : (
              ""
            )}
            {type === "announcement" ? (
              <>
                <span>
                  <b>Deadline:</b>
                </span>
                <span>{moment(data.deadline).calendar()}</span>
              </>
            ) : (
              ""
            )}
          </div>
          <div id="card-upper-text-sub-container" className={mode}>
            <span>
              <b>Date: </b>
            </span>
            <span>{dayjs(data.createdAt).fromNow()}</span>
          </div>
        </div>
        <Divider className={mode} />
        {type === "announcement" ? data.text : data.content}
        {data.file ? (
          <>
            <FileDisplayer
              mode={mode}
              title={
                type === "announcement"
                  ? "Announcements File"
                  : "Notification File"
              }
              dataSrc={data.file}
              customControl={null}
            />
          </>
        ) : (
          ""
        )}
        <div id="custom-button-container" className={mode}>
          {type === "announcement" &&
          data.type === "application" &&
          userData.type === "applicant"
            ? buttonRender(data.applicationId)
            : ""}
        </div>
      </CardContent>
      <CardActions className={mode}>
        <Button
          id="card-button"
          className={mode}
          onClick={() => {
            setButtonIconDown(!buttonIconDown);
            setContentWidthClass(
              contentWidthClass === "small" ? "big" : "small"
            );
          }}
        >
          {buttonIconDown ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = ({ applicationReducer, authReducer }) => {
  const { mode } = applicationReducer;
  const { userData } = authReducer;
  return {
    mode,
    userData,
  };
};

export default connect(mapStateToProps)(CustomCard);
