import { v4 as uuidv4 } from "uuid";

import firebase from "./index";

const database = firebase.database();
const storage = firebase.storage();
const ANNOUNCEMENTS_PATH = "announcements";

export const makeAnnouncement = async (announcement) => {
  const { file } = announcement;
  const dataToSaveDb = { ...announcement };

  if (file) {
    const path = `announcement_file_${uuidv4()}`;
    await storage.ref(path).put(file);

    const downloadUrl = await storage.ref(path).getDownloadURL();
    dataToSaveDb["file"] = downloadUrl;
  }

  await database.ref(ANNOUNCEMENTS_PATH).push(dataToSaveDb);
};

export const getAllAnnouncements = async (setData) => {
  const announcementRef = database.ref(ANNOUNCEMENTS_PATH);
  let result = [];
  const announcementData = await announcementRef.on("value", (snapshot) => {
    result = [];
    if (snapshot.val() === null) {
      setData([]);
      return;
    }
    Object.keys(snapshot.val()).forEach((value) => {
      result.push({
        value,
        ...snapshot.val()[value],
      });
    });
    setData(result);
  });
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
