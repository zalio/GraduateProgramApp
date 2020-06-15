import React from "react";
import { useHistory } from "react-router-dom";
import "./createInterview.scss";
import { connect } from "react-redux";
import CustomTable from "../../components/reusable/CustomTable";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";

const columns = [
  { id: "name", label: "Applicant Name", align: "center" },
  { id: "mail", label: "Applicant Email", align: "center" },
  { id: "type", label: "Application", align: "center" },
  { id: "interviewer1", label: "Interviewer-1 Email", align: "center" },
  { id: "interviewer2", label: "Interviewer-2 Email", align: "center" },
  { id: "interviewer3", label: "Interviewer-3 Email", align: "center" },
  { id: "interviewer4", label: "Interviewer-4 Email", align: "center" },
  { id: "interviewer5", label: "Interviewer-5 Email", align: "center" },
  { id: "date", label: "Date", align: "center" },
  { id: "location", label: "Location", align: "center" },
];

function createData(name, mail, type) {
  return { name, mail, type };
}

const rows = [
  createData("India", "IN", 1324171354),
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

const CreateInterview = ({ mode }) => {
  const history = useHistory();

  const customButton = () => {
    return (
      <Button onClick={() => history.push("/determine-interview")}>
        <ArrowForwardIosTwoToneIcon />
      </Button>
    );
  };
  return (
    <>
      <div id="make-announcement-page" className={mode}>
        <Container id="make-announcement-page-container" className={mode}>
          <CustomTable
            columns={columns}
            rows={rows}
            customButton={customButton}
            fileData={[]}
            customColumnTitle="Create Interview"
            type="interview"
          />
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = ({ applicationReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
  };
};

export default connect(mapStateToProps)(CreateInterview);
