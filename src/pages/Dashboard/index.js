import React, { useEffect } from "react";
import { connect } from "react-redux";

import ApplicantMainPage from "../ApplicantMainPage";
import "./dashboard.scss";
import { saveUser } from "../../services/firebase/user";
import {
  makeAnnouncement,
  getAllAnnouncements,
  getSpesificDepartmentAnnouncements,
} from "../../services/firebase/announcements";

const Dashboard = ({ mode, userData }) => {
  useEffect(() => {
    // // const newUserData = { ...userData, name: "Ridvan" };
    // const newUserData = { ...userData, department: "Computer Engineer" };
    // //  use await when you use real place
    // saveUser(newUserData);
    // makeAnnouncement({
    //   content: "Announcement Content",
    //   department: "MBG",
    //   createdAt: Date.now(),
    //   expiryDate: Date.now(),
    //   ownerUid: userData.uid,
    // });
    // getAllAnnouncementss();
    // getSpesificDepartmentAnnouncementss();
    // example request of apply
    // apply({
    //   applicantId: 1,
    //   applicantPhoto: "photonun path i",
    //   transcript: "pathi",
    //   masterTranscript: "pathi",
    //   alesResult: "pathi",
    //   englishExamResult: "pathi",
    //   reference: "pathi",
    //   purpose: "pathi",
    // });
  }, []);

  const getAllAnnouncementss = async () => {
    const allAnnouncements = await getAllAnnouncements();
    console.log("allAnnouncements: ", allAnnouncements);
  };

  const getSpesificDepartmentAnnouncementss = async () => {
    const spesDep = await getSpesificDepartmentAnnouncements("MBG");
    console.log("spes dep: ", spesDep);
  };

  return (
    <>
      <ApplicantMainPage />
    </>
  );
};

const mapStateToProps = ({ applicationReducer, authReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
    userData: authReducer.userData,
  };
};
export default connect(mapStateToProps)(Dashboard);
