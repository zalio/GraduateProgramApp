import React, { useEffect, useState } from "react";
import "./sendResult.scss";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FileUpload from "../../components/reusable/FileUpload";
import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { getAllInterviews } from "../../services/firebase/interviews";
import { getUser, getUserWithEmail } from "../../services/firebase/user";
import { sendNotification } from "../../services/firebase/notification";
import { useHistory } from "react-router-dom";

const SendResult = ({ mode, userData, allUsers }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [interviewers, setInterviewers] = useState([]);
  const [interviewer, setInterviewer] = useState(null);
  const [score, setScore] = useState("");
  const [text, setText] = useState("");
  const [isScoreError, setIsScoreError] = useState(false);

  const getInt = async () => {
    const getting = await getAllInterviews();
    const temp = [];
    getting.forEach((i) => {
      if (
        userData.email === i.interviewerOne.email ||
        userData.email === i.interviewerTwo.email ||
        userData.email === i.interviewerThree.email ||
        userData.email === i.interviewerFour.email ||
        userData.email === i.interviewerFive.email
      )
        temp.push({ email: i.applicantEmail });
    });
    console.log(temp);
    setInterviewers(temp);
  };

  useEffect(() => {
    getInt();
    if (allUsers !== null && allUsers.length !== 0 && userData !== null) {
      setUsers(
        allUsers.filter(
          (gu) =>
            gu &&
            gu.type === "department" &&
            gu.department === userData.department &&
            gu.isAdmin === "true"
        )
      );
    }
  }, []);

  const sendHandler = async () => {
    if (
      interviewer !== null &&
      user !== null &&
      score !== "" &&
      isScoreError !== true
    ) {
      await sendNotification({
        receiverId: user.uid,
        senderId: userData.uid,
        content:
          "The interview score of the applicant " +
          interviewer.email +
          " is : " +
          score +
          ".",
        createdAt: Date.now(),
      });
      alert("Successfully sent!");
      history.push("/");
    } else {
      alert("Please fill all of the required fields!");
    }
  };

  return (
    <>
      <div id="make-announcement-page" className={mode}>
        <Container id="make-announcement-page-container" className={mode}>
          <div>
            <h1>
              <b>Send Interview Result to Program Coordinator</b>
            </h1>
          </div>
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              value={user}
              options={users}
              onChange={(e, v) => setUser(v)}
              getOptionLabel={(option) => option.email}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Program Admin"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              value={interviewer}
              options={interviewers}
              onChange={(e, v) => setInterviewer(v)}
              getOptionLabel={(option) => option.email}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewed Applicant"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="login-email-container">
            <TextField
              error={isScoreError}
              id="login-email"
              label="Score (0-100) (optional)"
              value={score}
              type="number"
              onChange={(e) => {
                if (e.target.value < 0 || e.target.value > 100)
                  setIsScoreError(true);
                else setIsScoreError(false);
                if (e.target.value >= 0 || e.target.value <= 100)
                  setScore(e.target.value);
              }}
              className={mode}
            />
          </div>
          <div id="file-uploader">
            <TextField
              id="outlined-multiline-static"
              className={mode}
              label="Extra Information"
              value={text}
              onChange={(e) => setText(e.target.value)}
              multiline
              rows={10}
              variant="outlined"
            />
          </div>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              id="apply-button"
              className={mode}
              onClick={() => sendHandler()}
            >
              SEND
            </Button>
          )}
        </Container>
      </div>
    </>
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

export default connect(mapStateToProps)(SendResult);
