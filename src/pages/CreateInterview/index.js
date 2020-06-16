import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./createInterview.scss";
import moment from "moment";
import { connect } from "react-redux";
import CustomTable from "../../components/reusable/CustomTable";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";
import { getAllInterviews } from "../../services/firebase/interviews";

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

function createData(
  name,
  mail,
  type,
  interviewer1,
  interviewer2,
  interviewer3,
  interviewer4,
  interviewer5,
  date,
  location
) {
  return {
    name,
    mail,
    type,
    interviewer1,
    interviewer2,
    interviewer3,
    interviewer4,
    interviewer5,
    date,
    location,
  };
}

const CreateInterview = ({ mode }) => {
  const history = useHistory();

  const [interviews, setInterviews] = useState([]);
  const [rows, setRows] = useState([]);

  const get = async () => {
    const getting = await getAllInterviews();
    setInterviews(getting);
  };

  useEffect(() => {
    get();
    console.log(interviews);
  }, []);

  const getInterviewName = (data) => {
    if (data === "Still, not selected") {
      return data;
    } else {
      return data.email;
    }
  };

  useEffect(() => {
    console.log(interviews);
    const temp = [];
    interviews.forEach((i) => {
      temp.push(
        createData(
          i.applicantName,
          i.applicantEmail,
          i.applicationType + " " + i.department,
          getInterviewName(i.interviewerOne),
          getInterviewName(i.interviewerTwo),
          getInterviewName(i.interviewerThree),
          getInterviewName(i.interviewerFour),
          getInterviewName(i.interviewerFive),
          i.date === "Still, not selected" ? i.date : moment(i.date).calendar(),
          i.location
        )
      );
    });
    setRows(temp);
  }, [interviews]);

  const customButton = (idToGo, appData) => {
    console.log(idToGo, appData);
    return (
      <Button
        onClick={() =>
          history.push({
            pathname: "determine-interview",
            state: { id: idToGo, interview: appData },
          })
        }
      >
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
            fileData={interviews}
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
