import React, { useState } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import "./makeAnnouncement.scss";
import TextField from "@material-ui/core/TextField";
import FileUpload from "../../components/reusable/FileUpload";
import Button from "@material-ui/core/Button";

const MakeAnnouncement = ({ mode }) => {
  const [announceFile, setAnnounceFile] = useState(null);
  const [text, setText] = useState();

  return (
    <div id="make-announcement-page" className={mode}>
      <Container id="make-announcement-page-container" className={mode}>
        <div>
          <h1>
            <b>Make Announement</b>
          </h1>
        </div>
        <TextField
          id="outlined-multiline-static"
          className={mode}
          label="Write some text"
          multiline
          rows={10}
          variant="outlined"
        />
        <FileUpload
          type="announceFile"
          changeField={setAnnounceFile}
          placeholder="Upload File (Optional)"
          mode={mode}
        />
        <Button id="apply-button" className={mode}>
          SEND
        </Button>
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
