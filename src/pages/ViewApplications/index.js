import React, { useState } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import "./viewApplications.scss";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { CircularProgress } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import CustomTable from "../../components/reusable/CustomTable";

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

const ViewApplications = ({ mode }) => {
  const [department, setDepartment] = useState(null);
  const [program, setProgram] = useState("graduate");
  const [loading, setLoading] = useState(false);

  return (
    <div id="make-announcement-page" className={mode}>
      <Container id="make-announcement-page-container" className={mode}>
        <div>
          <h1>
            <b>View Applications</b>
          </h1>
        </div>
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
        <div id="file-uploader" className={mode}>
          <RadioGroup
            aria-label="type"
            name="gender1"
            id={"name-surname-container"}
          >
            <FormControlLabel
              value="graduate"
              control={<Radio />}
              label="Graduate"
              checked={program === "graduate"}
              onChange={(e) => setProgram(e.target.value)}
            />
            <FormControlLabel
              value="postgraduate"
              control={<Radio />}
              label="Postgraduate"
              checked={program === "postgraduate"}
              onChange={(e) => setProgram(e.target.value)}
            />
          </RadioGroup>
        </div>
        <div id="button-group-container">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button>Past Applicatons</Button>
            <Button>Current Applications</Button>
          </ButtonGroup>
        </div>
        <CustomTable />
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

export default connect(mapStateToProps)(ViewApplications);
