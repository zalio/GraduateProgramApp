import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Container from "@material-ui/core/Container";
import "./viewApplications.scss";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import CustomTable from "../../components/reusable/CustomTable";
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";
import { getApplications } from "../../services/firebase/applications";
import { getAllAnnouncements } from "../../services/firebase/announcement";

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

const ViewApplications = ({ mode, userData }) => {
  const history = useHistory();

  const [rows, setRows] = useState([]);
  const [filesResult, setFilesResult] = useState([]);

  const [department, setDepartment] = useState(null);
  const [program, setProgram] = useState("Master");

  const [allApplications, setAllApplications] = useState([]);
  const [allAnnouncements, setAllAnnouncements] = useState([]);

  const [selectedButton, setSelectedButton] = useState(0);

  const getAllApps = async () => {
    const getting = await getApplications();
    await getAllAnnouncements(setAllAnnouncements);
    setAllApplications(getting);
  };

  useEffect(() => {
    console.log(allAnnouncements, allApplications);
  }, [allAnnouncements, allApplications]);

  useEffect(() => {
    getAllApps();
    if (userData.type === "department") {
      setDepartment(
        departments[
          departments.findIndex((d) => d.title === userData.department)
        ]
      );
    }
  }, []);

  const customButton = (idToGo, appData) => {
    return (
      <Button
        onClick={() =>
          history.push({
            pathname: "display-files",
            state: { id: idToGo, application: appData },
          })
        }
      >
        <ArrowForwardIosTwoToneIcon />
      </Button>
    );
  };

  const viewApplicationsHandler = (type) => {
    const apps = [];
    const result = [];
    allAnnouncements.forEach((ann) => {
      if (
        ann.applicationType === program &&
        ann.department.title === department.title
      ) {
        if (type === "past") {
          setSelectedButton(1);
          if (ann.deadline < Date.now()) {
            apps.push(ann.applicationId);
          }
        } else if (type === "current") {
          setSelectedButton(2);
          if (ann.deadline > Date.now()) {
            apps.push(ann.applicationId);
          }
        }
      }
    });
    allApplications.forEach((app) => {
      if (apps.includes(app.announcementId)) {
        if (userData.type === "department" && app.status === "accepted")
          result.push(app);
      }
    });
    const tempRows = [];
    result.forEach((app) => {
      tempRows.push(
        createData(
          app.applicantName + " " + app.applicantSurname,
          app.applicantEmail,
          moment(app.createdAt).calendar(),
          app.status === "accepted"
            ? "Files Verified"
            : "Pending Verification of Files",
          app.department,
          app.applicationType
        )
      );
    });
    setRows(tempRows);
    setFilesResult(result);
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
            disabled={userData.type === "department"}
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
              value="Master"
              control={<Radio />}
              label="Master"
              checked={program === "Master"}
              onChange={(e) => setProgram(e.target.value)}
            />
            <FormControlLabel
              value="PhD"
              control={<Radio />}
              label="PhD"
              checked={program === "PhD"}
              onChange={(e) => setProgram(e.target.value)}
            />
          </RadioGroup>
        </div>
        <div id="button-group-container">
          <ButtonGroup
            className="view-app-button-container"
            disableElevation
            variant="contained"
            color="primary"
          >
            <Button
              onClick={() => viewApplicationsHandler("past")}
              disabled={department === null}
              className={
                selectedButton === 1
                  ? "view-app-button selected " + mode
                  : "view-app-button" + mode
              }
            >
              Past Applicatons
            </Button>
            <Button
              onClick={() => viewApplicationsHandler("current")}
              disabled={department === null}
              className={
                selectedButton === 2
                  ? "view-app-button selected " + mode
                  : "view-app-button" + mode
              }
            >
              Current Applications
            </Button>
          </ButtonGroup>
        </div>
        <CustomTable
          columns={columns}
          rows={rows}
          customButton={customButton}
          fileData={filesResult}
          customColumnTitle="Display Files"
          type="displayfiles"
        />
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

export default connect(mapStateToProps)(ViewApplications);
