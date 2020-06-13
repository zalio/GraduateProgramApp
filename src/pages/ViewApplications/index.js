import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";

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

const columns = [
  { id: "name", label: "Applicant Name", align: "center" },
  { id: "mail", label: "Applicant Email", minWidth: 170, align: "center" },
  {
    id: "date",
    label: "Application Date",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Application Status",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "department",
    label: "Department",
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "program",
    label: "Program",
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, mail, date, status, department, program) {
  return { name, mail, date, status, department, program };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263, 5656, 565656),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const ViewApplications = ({ mode }) => {
  const history = useHistory();

  const [department, setDepartment] = useState(null);
  const [program, setProgram] = useState("graduate");
  const [loading, setLoading] = useState(false);

  const customButton = () => {
    return (
      <Button onClick={() => history.push("/display-files")}>
        <ArrowForwardIosTwoToneIcon />
      </Button>
    );
  };

  return (
    <div id="make-announcement-page" className={mode}>
      <Container id="make-announcement-page-container" className={mode}>
        <div>
          <h1>
            <b>Display Applications</b>
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
              label="Master"
              checked={program === "graduate"}
              onChange={(e) => setProgram(e.target.value)}
            />
            <FormControlLabel
              value="postgraduate"
              control={<Radio />}
              label="PhD"
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
        <CustomTable
          columns={columns}
          rows={rows}
          customButton={customButton}
          customColumnTitle="Display Files"
        />
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
