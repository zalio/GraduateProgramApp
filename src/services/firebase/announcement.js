import firebase from "./index";

const database = firebase.database();
const ANNOUNCEMENTS_PATH = "announcements";

export const makeAnnouncement = async (announcement) => {
  await database.ref(ANNOUNCEMENTS_PATH).push(announcement);
};

export const getAllAnnouncements = async () => {
  const announcementRef = database.ref(ANNOUNCEMENTS_PATH);
  const announcementData = await announcementRef.once("value");

  const result = [];

  announcementData.forEach((value) => {
    result.push(value.val());
  });

  return result;
};

export const getSpesificDepartmentAnnouncements = async (department) => {
  const announcementRef = database.ref(ANNOUNCEMENTS_PATH);
  const announcementData = await announcementRef.once("value");

  const result = [];

  announcementData.forEach((value) => {
    const data = value.val();
    if (data.department === department) {
      result.push(value.val());
    }
  });

  return result;
};
