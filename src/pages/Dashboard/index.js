import React, { useEffect } from "react";
import { connect } from "react-redux";

import ApplicantMainPage from "../ApplicantMainPage";
import "./dashboard.scss";
import { getAllAnnouncements } from "../../services/firebase/announcement";
import { getUserNotifications } from "../../services/firebase/notification";

import {
  announcementsRequest,
  announcementsResponse,
  notificationsRequest,
  notificationsResponse,
} from "../../store/actions/application";

const Dashboard = ({
  userData,
  announcementsRequest,
  announcementsResponse,
  notificationsRequest,
  notificationsResponse,
}) => {
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
    getUserNotification();
    getAllAnnouncement();
  }, []);

  const getAllAnnouncement = async () => {
    announcementsRequest();
    const allAnnouncements = await getAllAnnouncements();
    announcementsResponse(allAnnouncements);
    console.log("allAnnouncements: ", allAnnouncements);
  };

  const getUserNotification = async () => {
    notificationsRequest();
    const { uid } = userData;
    const notifications = await getUserNotifications(uid);
    notificationsResponse(notifications);
    console.log("notifications: ", notifications);
  };

  useEffect(() => {
    getUserNotification();
    getAllAnnouncement();
  }, []);

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
const mapDispatchToProps = {
  announcementsRequest,
  announcementsResponse,
  notificationsRequest,
  notificationsResponse,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
