import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import "./makeAnnouncement.scss";
import TextField from "@material-ui/core/TextField";
import FileUpload from "../../components/reusable/FileUpload";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";

import { makeAnnouncement } from "../../services/firebase/announcement";
import { CircularProgress } from "@material-ui/core";

const MakeAnnouncement = ({ mode }) => {
  const history = useHistory();

  const [announceFile, setAnnounceFile] = useState(null);
  const [text, setText] = useState();
  const [type, setType] = useState("application");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    const submitData = {
      file: announceFile,
      text: text,
      type: type,
    };
    try {
      await makeAnnouncement(submitData);
      history.push("/dashboard");
      alert("Successfully announced!");
    } catch (e) {
      alert("There is an error while announcing!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="make-announcement-page" className={mode}>
      <Container id="make-announcement-page-container" className={mode}>
        <div>
          <h1>
            <b>Make Announcement</b>
          </h1>
        </div>
        <TextField
          id="outlined-multiline-static"
          className={mode}
          label="Write some text"
          multiline
          rows={10}
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
        />
        <FileUpload
          type="announceFile"
          changeField={setAnnounceFile}
          placeholder="Upload File (Optional)"
          mode={mode}
        />
        <div id="file-uploader" className={mode}>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            id={"name-surname-container"}
          >
            <FormControlLabel
              value="application"
              control={<Radio />}
              label="Application"
              checked={type === "application"}
              onChange={(e) => setType(e.target.value)}
            />
            <FormControlLabel
              value="result"
              control={<Radio />}
              label="Result"
              checked={type === "result"}
              onChange={(e) => setType(e.target.value)}
            />
          </RadioGroup>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            id="apply-button"
            className={mode}
            variant="contained"
            onClick={submitHandler}
          >
            <b>ANNOUNCE</b>
          </Button>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = ({ applicationReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
  };
};

export default connect(mapStateToProps)(MakeAnnouncement);
