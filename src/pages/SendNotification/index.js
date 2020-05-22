import React, { useState } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import "./sendNotification.scss";
import TextField from "@material-ui/core/TextField";
import FileUpload from "../../components/reusable/FileUpload";
import Button from "@material-ui/core/Button";

const SendNotification = ({ mode }) => {
  const [noticiationFile, setNotificationFile] = useState(null);
  const [receiver, setReceiver] = useState();
  const [text, setText] = useState();

  return (
    <div id="make-announcement-page" className={mode}>
      <Container id="make-announcement-page-container" className={mode}>
        <div>
          <h1>
            <b>Send Notification</b>
          </h1>
        </div>
        <div id="login-email-container">
          <TextField
            error={false}
            id="login-email"
            label="Your e-mail"
            value={receiver}
            className={mode}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <TextField
          id="outlined-multiline-static"
          className={mode}
          label="Write some text"
          value={text}
          multiline
          rows={10}
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
        />
        <FileUpload
          type="announceFile"
          changeField={setNotificationFile}
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

export default connect(mapStateToProps)(SendNotification);
