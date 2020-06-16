import React, { useEffect, useState } from "react";
import "./sendResultToGradschool.scss";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FileUpload from "../../components/reusable/FileUpload";
import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { sendNotification } from "../../services/firebase/notification";
import { useHistory } from "react-router-dom";

const SendResultToGradschool = ({ mode, allUsers }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState(null);

  const sendHandler = async () => {
    setLoading(true);
    await sendNotification({
      receiverId: user.uid,
      content: text === "" ? "Combined result of the interview!" : text,
      file: file,
      createdAt: Date.now(),
    });
    setLoading(false);
    alert("Successfully sent!");
    history.push("/");
  };

  useEffect(() => {
    if (allUsers !== null && allUsers.length !== 0) {
      console.log(allUsers);
      setUsers(allUsers.filter((gu) => gu && gu.type === "gradschool"));
    }
  }, []);

  return (
    <>
      <div id="make-announcement-page" className={mode}>
        <Container id="make-announcement-page-container" className={mode}>
          <div>
            <h1>
              <b>Send Results To Grad School</b>
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
                  label="Grad School User"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="file-uploader">
            <FileUpload
              type="ales"
              changeField={setFile}
              mode={mode}
              placeholder="Combined Results File (Required)"
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
              disabled={user === null || file === null}
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
const mapStateToProps = ({ applicationReducer, usersReducer }) => {
  const { mode } = applicationReducer;
  const { allUsers } = usersReducer;
  return {
    mode,
    allUsers,
  };
};

export default connect(mapStateToProps)(SendResultToGradschool);
