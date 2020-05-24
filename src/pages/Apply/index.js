import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import FileUpload from "../../components/reusable/FileUpload";
import Container from "@material-ui/core/Container";
import "./apply.scss";
import Button from "@material-ui/core/Button";
import { apply } from "../../services/firebase/apply";
import { CircularProgress } from "@material-ui/core";

const Apply = ({ mode, userData }) => {
  const location = useLocation();
  const history = useHistory();

  const [applicationData, setApplicationData] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [masterTranscript, setMasterTranscript] = useState(null);
  const [ales, setAles] = useState(null);
  const [englishExam, setEnglishExam] = useState(null);
  const [reference, setReference] = useState(null);
  const [purpose, setPurpose] = useState(null);

  const [loading, setLoading] = useState(false);

  const isDisabled = () =>
    photo === null ||
    transcript === null ||
    ales === null ||
    englishExam === null ||
    purpose === null ||
    (applicationData &&
      applicationData.applicationType === "postgraduate" &&
      masterTranscript === null);

  const applyHandler = async () => {
    if (isDisabled()) {
      alert("Please fill the all fields!");
      return;
    }
    setLoading(true);
    const applyData = {
      applicationId: location.state.id,
      applicantId: userData.uid,
      fileData: {
        applicantPhoto: photo,
        transcript: transcript,
        masterTranscript: masterTranscript,
        alesResult: ales,
        englishExamResult: englishExam,
        reference: reference,
        purpose: purpose,
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
  console.log(location.state.application);
  useEffect(() => setApplicationData(location.state.application), []);

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
            placeholder="Upload Photo"
            mode={mode}
          />
          <FileUpload
            type="transcript"
            changeField={setTranscript}
            placeholder="Undergrad Transcript"
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
            placeholder="ALES Result"
          />
          <FileUpload
            type="englishExam"
            changeField={setEnglishExam}
            placeholder="English Exam Result"
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
            placeholder="Statement of Purpose"
            mode={mode}
          />
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
