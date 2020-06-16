import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import "./displayFiles.scss";
import Grid from "@material-ui/core/Grid";
import FileDisplayer from "../../components/reusable/FileDisplayer";
import avatar from "../../app/assets/images/avatar.jpg";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import Button from "@material-ui/core/Button";
import { sendNotification } from "../../services/firebase/notification";
import { getUserWithEmail } from "../../services/firebase/user";
import {
  deleteApplication,
  saveApplication,
} from "../../services/firebase/applications";
import {
  createInterview,
  getAllInterviews,
} from "../../services/firebase/interviews";

const DisplayFiles = ({ mode, userData }) => {
  const location = useLocation();
  const history = useHistory();

  const [applicationData, setApplicationData] = useState(null);
  const [department, setDepartment] = useState(null);
  const [program, setProgram] = useState("Master");
  const [loading, setLoading] = useState(false);

  const [acceptTranscript, setAcceptTranscript] = useState(false);
  const [acceptMasterTranscript, setAcceptMasterTranscript] = useState(false);
  const [acceptALES, setAcceptALES] = useState(false);
  const [acceptEnglish, setAcceptEnglish] = useState(false);
  const [acceptReference, setAcceptReference] = useState(false);
  const [acceptPurpose, setAcceptPurpose] = useState(false);
  const [acceptPermissionLetter, setAcceptPermissionLetter] = useState(false);
  const [acceptPassport, setAcceptPassport] = useState(false);

  const customControl = (value, setValue) => {
    return (
      <RadioGroup aria-label="type" name="gender1" id="accept-radio-container">
        <FormControlLabel
          value={true}
          control={<Radio id="accept-radio-icon" />}
          label="Valid"
          checked={value === true}
          id="accept-radio"
          onChange={(e) => setValue(true)}
        />
        <FormControlLabel
          value={false}
          control={<Radio />}
          label="Invalid"
          checked={value === false}
          onChange={(e) => setValue(false)}
        />
      </RadioGroup>
    );
  };

  useEffect(() => {
    if (location.state) setApplicationData(location.state.application);
    else history.push("/");
  }, []);

  useEffect(() => {
    console.log(applicationData);
    if (applicationData !== null && applicationData.status === "accepted") {
      setAcceptTranscript(true);
      setAcceptMasterTranscript(true);
      setAcceptALES(true);
      setAcceptEnglish(true);
      setAcceptPermissionLetter(true);
      setAcceptPassport(true);
      setAcceptReference(true);
      setAcceptPurpose(true);
    }
  }, [applicationData]);

  const rejectApplicationHandler = async () => {
    const receiverUserData = await getUserWithEmail(
      applicationData.applicantEmail
    );
    await sendNotification({
      receiverId: receiverUserData.uid,
      senderId: userData.uid,
      content:
        "Your application has been rejected, please check your files and reapply the application!!",
      createdAt: Date.now(),
    });
    await deleteApplication(applicationData);
    alert(
      "Some files have been found invalid. The applicant has been informed and this application has been deleted."
    );
    history.push("/");
  };

  const acceptApplicationHandler = async () => {
    const receiverUserData = await getUserWithEmail(
      applicationData.applicantEmail
    );
    if (
      acceptTranscript &&
      (applicationData.masterTranscript ? acceptMasterTranscript : true) &&
      acceptALES &&
      acceptEnglish &&
      (applicationData.reference ? acceptReference : true) &&
      acceptPurpose &&
      (applicationData.permissionLetter ? acceptPermissionLetter : true) &&
      (applicationData.passport ? acceptPassport : true)
    ) {
      await sendNotification({
        receiverId: receiverUserData.uid,
        senderId: userData.uid,
        content:
          "Your application has been accepted, wait for notification about your interview!",
        createdAt: Date.now(),
      });
      await saveApplication({ ...applicationData, status: "accepted" });
      await createInterview({
        ...applicationData,
        interviewerOne: "Not selected yet",
        interviewerTwo: "Not selected yet",
        interviewerThree: "Not selected yet",
        interviewerFour: "Not selected yet",
        interviewerFive: "Not selected yet",
        location: "Not selected yet",
        date: "Not selected yet",
      });
      alert(
        "All files have been confirmed. The documents are sent to the corresponding department of this application."
      );
      history.push("/view-applications");
    } else {
      alert(
        "You cannot send documents to corresponding department without verifying all of the documents."
      );
    }
  };

  return (
    <div id="make-announcement-page" className={mode}>
      <Container id="make-announcement-page-container" className={mode}>
        <div>
          <h1>
            <b>
              Display Documents of{" "}
              {applicationData
                ? `${applicationData.applicantName} ${applicationData.applicantSurname}`
                : ""}
            </b>
          </h1>
          <p>
            {userData.type === "gradschool"
              ? "The documents are accessed by clicking their names. Please verify the documents of the applicant by choosing between Correct and Incorrect options. If all documents are verified to be correct, please click Send Documents to the Corresponding Department button. Even if a single document is incorrect, please click Inform Applicant button. The applicant will be informed automatically."
              : "The documents are accessed by clicking their names to be viewed."}
          </p>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <img
              className="avatar-img"
              src={applicationData ? applicationData.applicantPhoto : avatar}
              alt=""
            />
          </Grid>
          <Grid item xs={9}>
            {applicationData ? (
              <FileDisplayer
                mode={mode}
                title="Transcript"
                customControl={customControl}
                value={acceptTranscript}
                setValue={setAcceptTranscript}
                dataSrc={applicationData.transcript}
                userType={userData.type}
                disabled={
                  applicationData && applicationData.status === "accepted"
                }
              />
            ) : (
              ""
            )}
            {applicationData && applicationData.masterTranscript ? (
              <FileDisplayer
                mode={mode}
                title="Master Transcript"
                customControl={customControl}
                value={acceptMasterTranscript}
                setValue={setAcceptMasterTranscript}
                dataSrc={applicationData.masterTranscript}
                userType={userData.type}
                disabled={
                  applicationData && applicationData.status === "accepted"
                }
              />
            ) : (
              ""
            )}
            {applicationData ? (
              <FileDisplayer
                mode={mode}
                title="ALES Result"
                customControl={customControl}
                value={acceptALES}
                setValue={setAcceptALES}
                dataSrc={applicationData.alesResult}
                userType={userData.type}
                disabled={
                  applicationData && applicationData.status === "accepted"
                }
              />
            ) : (
              ""
            )}
            {applicationData ? (
              <FileDisplayer
                mode={mode}
                title="English Exam Result"
                customControl={customControl}
                value={acceptEnglish}
                setValue={setAcceptEnglish}
                dataSrc={applicationData.englishExamResult}
                userType={userData.type}
                disabled={
                  applicationData && applicationData.status === "accepted"
                }
              />
            ) : (
              ""
            )}
            {applicationData && applicationData.reference ? (
              <FileDisplayer
                mode={mode}
                title="Reference Letters"
                customControl={customControl}
                value={acceptReference}
                setValue={setAcceptReference}
                dataSrc={applicationData.reference}
                userType={userData.type}
                disabled={
                  applicationData && applicationData.status === "accepted"
                }
              />
            ) : (
              ""
            )}
            {applicationData ? (
              <FileDisplayer
                mode={mode}
                title="Statement of Purpose"
                customControl={customControl}
                value={acceptPurpose}
                setValue={setAcceptPurpose}
                dataSrc={applicationData.purpose}
                userType={userData.type}
                disabled={
                  applicationData && applicationData.status === "accepted"
                }
              />
            ) : (
              ""
            )}
            {applicationData && applicationData.permissionLetter ? (
              <FileDisplayer
                mode={mode}
                title="Permission Letter"
                customControl={customControl}
                value={acceptPermissionLetter}
                setValue={setAcceptPermissionLetter}
                dataSrc={applicationData.permissionLetter}
                userType={userData.type}
                disabled={
                  applicationData && applicationData.status === "accepted"
                }
              />
            ) : (
              ""
            )}
            {applicationData && applicationData.passport ? (
              <FileDisplayer
                mode={mode}
                title="Passport"
                customControl={customControl}
                value={acceptPassport}
                setValue={setAcceptPassport}
                dataSrc={applicationData.passport}
                userType={userData.type}
                disabled={
                  applicationData && applicationData.status === "accepted"
                }
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        {userData.type === "gradschool" &&
        applicationData !== null &&
        applicationData.status !== "accepted" ? (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="display-files-button-container">
                <Button
                  className={"display-files-button " + mode}
                  onClick={() => rejectApplicationHandler()}
                >
                  Inform Applicant
                </Button>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="display-files-button-container">
                <Button
                  className={"display-files-button " + mode}
                  onClick={() => acceptApplicationHandler()}
                >
                  Send Documents
                </Button>
              </div>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Container>
    </div>
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

export default connect(mapStateToProps)(DisplayFiles);
