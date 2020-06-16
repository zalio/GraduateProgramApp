import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import FileUpload from "../../components/reusable/FileUpload";
import Container from "@material-ui/core/Container";
import moment from "moment";
import "./DetermineInterview.scss";
import Button from "@material-ui/core/Button";
import { apply } from "../../services/firebase/apply";
import { CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { saveInterview } from "../../services/firebase/interviews";
import { getAllUser, saveUser } from "../../services/firebase/user";
import {
  sendNotification,
  sendNotificationToUsers,
} from "../../services/firebase/notification";

const DetermineInterview = ({ mode, userData, allUsers }) => {
  const location = useLocation();
  const history = useHistory();

  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [interviewer1, setInterviewer1] = useState(null);
  const [interviewer2, setInterviewer2] = useState(null);
  const [interviewer3, setInterviewer3] = useState(null);
  const [interviewer4, setInterviewer4] = useState(null);
  const [interviewer5, setInterviewer5] = useState(null);
  const [date, setDate] = useState(null);
  const [interviewLocation, setInterviewLocation] = useState("");

  useEffect(() => {
    if (location.state) setInterviewData(location.state.interview);
    else history.push("/");
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (allUsers !== null && allUsers.length !== 0 && interviewData !== null) {
      setUsers(
        allUsers.filter(
          (gu) =>
            gu &&
            gu.type === "department" &&
            gu.department === interviewData.department
        )
      );
    }
    if (
      interviewData !== null &&
      interviewData.interviewerOne !== "Not selected yet"
    ) {
      setInterviewer1(interviewData.interviewerOne);
      setInterviewer2(interviewData.interviewerTwo);
      setInterviewer3(interviewData.interviewerThree);
      setInterviewer4(interviewData.interviewerFour);
      setInterviewer5(interviewData.interviewerFive);
      setInterviewLocation(interviewData.location);
      setDate(interviewData.date);
    }
  }, [interviewData]);

  const getDate = (date) => {
    return moment(date).calendar();
  };

  const saveHandler = async () => {
    setLoading(true);
    if (
      interviewer1 !== null &&
      interviewer2 !== null &&
      interviewer3 !== null &&
      interviewer4 !== null &&
      interviewer5 !== null &&
      date !== null &&
      interviewLocation !== null
    ) {
      await saveInterview({
        ...interviewData,
        interviewerOne: interviewer1,
        interviewerTwo: interviewer2,
        interviewerThree: interviewer3,
        interviewerFour: interviewer4,
        interviewerFive: interviewer5,
        date: date,
        location: interviewLocation,
      });
      alert(
        "Successfully saved! Information is sent to applicant and all of the interviewers!"
      );
      await saveUser({ ...interviewer1, isInterviewer: "true" });
      await saveUser({ ...interviewer2, isInterviewer: "true" });
      await saveUser({ ...interviewer3, isInterviewer: "true" });
      await saveUser({ ...interviewer4, isInterviewer: "true" });
      await saveUser({ ...interviewer5, isInterviewer: "true" });
      await sendNotification({
        receiverId: interviewData.applicantId,
        senderId: userData.uid,
        content:
          "Your interview details: Location is " +
          interviewLocation.toString() +
          ", and the Date is " +
          getDate(date),
        createdAt: Date.now(),
      });
      await sendNotification({
        receiverId: interviewer1.uid,
        senderId: userData.uid,
        content:
          "Your interview details: Location is " +
          interviewLocation.toString() +
          ", and the Date is " +
          getDate(date),
        createdAt: Date.now(),
      });
      await sendNotification({
        receiverId: interviewer2.uid,
        senderId: userData.uid,
        content:
          "Your interview details: Location is " +
          interviewLocation.toString() +
          ", and the Date is " +
          getDate(date),
        createdAt: Date.now(),
      });
      await sendNotification({
        receiverId: interviewer3.uid,
        senderId: userData.uid,
        content:
          "Your interview details: Location is " +
          interviewLocation.toString() +
          ", and the Date is " +
          getDate(date),
        createdAt: Date.now(),
      });
      await sendNotification({
        receiverId: interviewer4.uid,
        senderId: userData.uid,
        content:
          "Your interview details: Location is " +
          interviewLocation.toString() +
          ", and the Date is " +
          getDate(date),
        createdAt: Date.now(),
      });
      await sendNotification({
        receiverId: interviewer5.uid,
        senderId: userData.uid,
        content:
          "Your interview details: Location is " +
          interviewLocation.toString() +
          ", and the Date is " +
          getDate(date),
        createdAt: Date.now(),
      });
      setLoading(false);
      history.push("/");
    } else {
      alert("You must select all of the fields!");
      setLoading(false);
    }
  };

  return (
    <div id="make-announcement-page" className={mode}>
      <Container id="make-announcement-page-container" className={mode}>
        <div id="apply-page-upper-text" className={mode}>
          Choose the Interviewers
        </div>
        <div id="apply-page-insider">
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              value={interviewer1}
              options={users}
              onChange={(e, v) => setInterviewer1(v)}
              getOptionLabel={(option) => option.email}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewer 1 Email"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              value={interviewer2}
              options={users}
              onChange={(e, v) => setInterviewer2(v)}
              getOptionLabel={(option) => option.email}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewer 2 Email"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              value={interviewer3}
              options={users}
              onChange={(e, v) => setInterviewer3(v)}
              getOptionLabel={(option) => option.email}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewer 3 Email"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              value={interviewer4}
              options={users}
              onChange={(e, v) => setInterviewer4(v)}
              getOptionLabel={(option) => option.email}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewer 4 Email"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              value={interviewer5}
              options={users}
              onChange={(e, v) => setInterviewer5(v)}
              getOptionLabel={(option) => option.email}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewer 5 Email"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id={"birth-container"} className={mode}>
            <div id={"birth-label"} className={mode}>
              <h3 className={mode}>Date and Location</h3>
            </div>
            <div id={"date-icon-container"}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    label="Choose Date"
                    id="date-picker-dialog"
                    className={mode}
                    value={date}
                    onChange={(e) => setDate(e.getTime())}
                    format="MM/dd/yyyy"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div id="login-email-container">
            <TextField
              error={false}
              id="login-email"
              label="Location"
              value={interviewLocation}
              onChange={(e) => setInterviewLocation(e.target.value)}
              className={mode}
            />
          </div>
        </div>
        <div id="apply-button-container">
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              id="apply-button"
              className={mode}
              onClick={() => saveHandler()}
            >
              SAVE
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ applicationReducer, authReducer, usersReducer }) => {
  const { mode } = applicationReducer;
  const { userData } = authReducer;
  const { allUsers } = usersReducer;
  return {
    mode,
    userData,
    allUsers,
  };
};

export default connect(mapStateToProps)(DetermineInterview);
