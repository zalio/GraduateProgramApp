import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import FileUpload from "../../components/reusable/FileUpload";
import Container from "@material-ui/core/Container";
import "./apply.scss";
import Button from "@material-ui/core/Button";
import { apply } from "../../services/firebase/apply";
import { CircularProgress } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Apply = ({ mode, userData }) => {
  const location = useLocation();
  const history = useHistory();

  const [applicationData, setApplicationData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [masterTranscript, setMasterTranscript] = useState(null);
  const [ales, setAles] = useState(null);
  const [englishExam, setEnglishExam] = useState(null);
  const [reference, setReference] = useState(null);
  const [purpose, setPurpose] = useState(null);

  const [working, setWorking] = useState(false);
  const [notCitizen, setNotCitizen] = useState(false);

  const [passport, setPassport] = useState(null);
  const [permissionLetter, setPermissionLetter] = useState(null);

  const isDisabled = () =>
    photo === null ||
    transcript === null ||
    ales === null ||
    englishExam === null ||
    purpose === null ||
    (working === true && permissionLetter === null) ||
    (notCitizen === true && passport === null);

  const applyHandler = async () => {
    if (isDisabled()) {
      alert("Please fill the all fields!");
      return;
    }
    setLoading(true);
    const applyData = {
      announcementId: location.state.id,
      applicantId: userData.uid,
      status: "pending",
      fileData: {
        applicantPhoto: photo,
        transcript: transcript,
        masterTranscript: masterTranscript,
        alesResult: ales,
        englishExamResult: englishExam,
        reference: reference,
        purpose: purpose,
        permissionLetter: permissionLetter,
        passport: passport,
      },
    };
    try {
      await apply(applyData);
      alert("Successfully applied!");
    } catch (e) {
      alert("There is an error while applying!");
    } finally {
      setLoading(false);
      history.push("/dashboard");
    }
  };
  useEffect(() => {
    if (location.state) setApplicationData(location.state.application);
    else history.push("/");
  }, []);

  return (
    <div id="apply-page">
      <Container id="apply-page-container" className={mode}>
        <div id="apply-page-upper-text" className={mode}>
          Apply The Program!
          <p>{applicationData ? applicationData.text : ""}</p>
        </div>
        <div id="apply-page-insider">
          <FileUpload
            type="photo"
            changeField={setPhoto}
            placeholder="Upload Photo (Required)"
            mode={mode}
          />
          <FileUpload
            type="transcript"
            changeField={setTranscript}
            placeholder="Undergrad Transcript (Required)"
            mode={mode}
          />
          <FileUpload
            type="masterTranscript"
            changeField={setMasterTranscript}
            placeholder="Master Transcript"
            mode={mode}
          />
          <FileUpload
            type="ales"
            changeField={setAles}
            mode={mode}
            placeholder="ALES Result (Required)"
          />
          <FileUpload
            type="englishExam"
            changeField={setEnglishExam}
            placeholder="English Exam Result (Required)"
            mode={mode}
          />
          <FileUpload
            type="reference"
            changeField={setReference}
            placeholder="Reference Letters"
            mode={mode}
          />
          <FileUpload
            type="purpose"
            changeField={setPurpose}
            placeholder="Statement of Purpose (Required)"
            mode={mode}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="working"
                checked={working === true}
                onChange={(e) => setWorking(e.target.checked)}
                color="primary"
              />
            }
            label="I am working"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="notCitizen"
                checked={notCitizen === true}
                onChange={(e) => setNotCitizen(e.target.checked)}
                color="primary"
              />
            }
            label="I am not citizen of Turkey"
          />
          {working === true ? (
            <FileUpload
              type="permission"
              changeField={setPermissionLetter}
              placeholder="Permission Letter (Required)"
              mode={mode}
            />
          ) : (
            ""
          )}
          {notCitizen === true ? (
            <FileUpload
              type="notCitizen"
              changeField={setNotCitizen}
              placeholder="Passport Copy (Required)"
              mode={mode}
            />
          ) : (
            ""
          )}
        </div>
        <div id="apply-button-container">
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              id="apply-button"
              className={mode}
              onClick={() => applyHandler()}
              disabled={isDisabled()}
            >
              APPLY
            </Button>
          )}
        </div>
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

export default connect(mapStateToProps)(Apply);
