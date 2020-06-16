import React, { useState } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import "./sendNotification.scss";
import TextField from "@material-ui/core/TextField";
import FileUpload from "../../components/reusable/FileUpload";
import Button from "@material-ui/core/Button";
import { sendNotification } from "../../services/firebase/notification";
import { getUserWithEmail } from "../../services/firebase/user";
import { CircularProgress } from "@material-ui/core";

const SendNotification = ({ mode, userData }) => {
  const [notificationFile, setNotificationFile] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const clearData = () => {
    setNotificationFile(null);
    setReceiver("");
    setText("");
  };

  const onSendNotificationPress = async () => {
    setLoading(true);
    if (receiver === "" || text === "") {
      return;
    }

    const receiverUserData = await getUserWithEmail(receiver);

    if (!receiverUserData) {
      setLoading(false);
      return alert("There is no user with this email!");
    }

    const { uid: receiverId } = receiverUserData;

    try {
      await sendNotification({
        receiverId,
        senderId: userData.uid,
        content: text,
        file: notificationFile,
        createdAt: Date.now(),
      });
      alert("Successfully sent!");
    } catch (e) {
      alert("There is an error while sending notificaiton!");
    } finally {
      setLoading(false);
      clearData();
    }
  };

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
            label="Receiver e-mail"
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
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            id="apply-button"
            className={mode}
            onClick={onSendNotificationPress}
            disabled={text === "" || receiver === ""}
          >
            SEND
          </Button>
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

export default connect(mapStateToProps)(SendNotification);
