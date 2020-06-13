import React, { useState } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import "./makeAnnouncement.scss";
import TextField from "@material-ui/core/TextField";
import FileUpload from "../../components/reusable/FileUpload";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { makeAnnouncement } from "../../services/firebase/announcement";
import { CircularProgress } from "@material-ui/core";

const departments = [
  { title: "Computer Engineering", value: 1 },
  { title: "Electrical and Communications Engineering", value: 2 },
  { title: "Civil Engineering", value: 3 },
  { title: "Chemical Engineering", value: 4 },
  { title: "Mechanical Engineering", value: 5 },
  { title: "Architecture", value: 6 },
  { title: "City and Regional Planning", value: 7 },
  { title: "Molecular Biology and Genetics", value: 8 },
  { title: "Physics", value: 9 },
  { title: "Chemistry", value: 10 },
  { title: "Mathematics", value: 11 },
];

const MakeAnnouncement = ({ mode }) => {
  const [announceFile, setAnnounceFile] = useState(null);
  const [text, setText] = useState("");
  const [type, setType] = useState("application");
  const [applicationType, setApplicationType] = useState("graduate");
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    const submitData = {
      file: announceFile,
      text: text,
      type: type,
      applicationType: applicationType,
      department: department,
      createdAt: Date.now(),
    };
    try {
      await makeAnnouncement(submitData);
      alert("Successfully announced!");
    } catch (e) {
      alert("There is an error while announcing!");
    } finally {
      setText("");
      setType("application");
      setApplicationType("graduate");
      setDepartment(null);
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
          label="Write some text (Required)"
          value={text}
          multiline
          rows={10}
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
        />
        <div id="file-uploader" className={mode}>
          <RadioGroup
            aria-label="type"
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
          <RadioGroup
            aria-label="applicationType"
            name="gender1"
            id={"name-surname-container"}
          >
            <FormControlLabel
              value="graduate"
              control={<Radio />}
              label="Master"
              checked={applicationType === "graduate"}
              onChange={(e) => setApplicationType(e.target.value)}
            />
            <FormControlLabel
              value="postgraduate"
              control={<Radio />}
              label="PhD"
              checked={applicationType === "postgraduate"}
              onChange={(e) => setApplicationType(e.target.value)}
            />
          </RadioGroup>
        </div>
        {type !== "result" ? (
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              options={departments}
              getOptionLabel={(option) => option.title}
              value={department}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              onChange={(e, v) => {
                setDepartment(v);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department (Required)"
                  variant="outlined"
                />
              )}
            />
          </div>
        ) : (
          ""
        )}
        <FileUpload
          type="announceFile"
          changeField={setAnnounceFile}
          placeholder="Upload File (Optional)"
          mode={mode}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            id="apply-button"
            className={mode}
            variant="contained"
            onClick={submitHandler}
            disabled={text === "" || (type !== "result" && department === null)}
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
