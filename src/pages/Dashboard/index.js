import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import ApplicantMainPage from "../ApplicantMainPage";
import GradSchoolMainPage from "../GradSchoolMainPage";
import DepartmentMainPage from "../DepartmentMainPage";

import "./dashboard.scss";
import { getAllAnnouncements } from "../../services/firebase/announcement";
import { getUserNotifications } from "../../services/firebase/notification";

import {
  announcementsRequest,
  announcementsResponse,
  notificationsRequest,
  notificationsResponse,
} from "../../store/actions/application";
import { getAllUser } from "../../services/firebase/user";

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

    getAllUser();
  }, []);
  const [announcements, setAnnouncements] = useState(null);
  const [notifications, setNotifications] = useState(null);

  const getAllAnnouncement = async () => {
    announcementsRequest();
    const result = await getAllAnnouncements(setAnnouncements);
  };

  const getUserNotification = async () => {
    notificationsRequest();
    const { uid } = userData;
    const result = await getUserNotifications(uid, setNotifications);
  };

  useEffect(() => {
    getUserNotification();
    getAllAnnouncement();
  }, []);

  useEffect(() => {
    if (announcements !== null) {
      announcementsResponse(announcements);
    }
  }, [announcements]);

  useEffect(() => {
    if (notifications !== null) notificationsResponse(notifications);
  }, [notifications]);

  const renderItem = () => {
    if (userData.type === "gradschool")
      return (
        <GradSchoolMainPage
          announcementsIsLoading={announcements === null}
          notificationsIsLoading={notifications === null}
        />
      );
    else if (userData.type === "department")
      return (
        <DepartmentMainPage
          announcementsIsLoading={announcements === null}
          notificationsIsLoading={notifications === null}
        />
      );
    return (
      <ApplicantMainPage
        announcementsIsLoading={announcements === null}
        notificationsIsLoading={notifications === null}
      />
    );
  };

  return <>{renderItem()}</>;
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
