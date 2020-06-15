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

const DisplayFiles = ({ mode, userData }) => {
  const location = useLocation();
  const history = useHistory();

  const [applicationData, setApplicationData] = useState(null);
  const [department, setDepartment] = useState(null);
  const [program, setProgram] = useState("graduate");
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

  const rejectApplicationHandler = async () => {
    const receiverUserData = await getUserWithEmail(
      applicationData.applicantEmail
    );
    await sendNotification({
      receiverId: receiverUserData.uid,
      content:
        "Your application has been rejected, please check your files and reapply the application!!",
      createdAt: Date.now(),
    });
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
        content:
          "Your application has been accepted, wait for notification about your interview!",
        createdAt: Date.now(),
      });
    } else {
      alert("You can not accept without selecting all of the files ");
    }
  };

  return (
    <div id="make-announcement-page" className={mode}>
      <Container id="make-announcement-page-container" className={mode}>
        <div>
          <h1>
            <b>Display Application</b>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
            ea, esse? Accusantium ad amet asperiores, cupiditate distinctio est
            ex maiores neque nihil, nisi nostrum nulla similique soluta suscipit
            tenetur ullam?
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
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        {userData.type === "gradschool" ? (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div>
                <Button
                  id="diplay-files-button"
                  onClick={() => rejectApplicationHandler()}
                >
                  Inform Applicant
                </Button>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <Button
                  id="apply-button"
                  onClick={() => acceptApplicationHandler()}
                >
                  Accept Applicant
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
