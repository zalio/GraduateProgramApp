import { v4 as uuidv4 } from "uuid";

import firebase from "./index";

import { USERS_PATH } from "./user";

const notificationsPath = "notifications";

const database = firebase.database();
const storage = firebase.storage();

export const sendNotification = async (notification) => {
  const { receiverId, file } = notification;
  const userNotificatiosPath = `${USERS_PATH}/${receiverId}/${notificationsPath}`;
  const dataToSaveDb = { ...notification };

  if (file) {
    const path = `notification_file_${uuidv4()}`;
    await storage.ref(path).put(file);
    const downloadUrl = await storage.ref(path).getDownloadURL();

    dataToSaveDb["file"] = downloadUrl;
  }

  await database.ref(userNotificatiosPath).push(dataToSaveDb);
};

export const getUserNotifications = async (userId) => {
  const notificationsPath = database.ref(`${USERS_PATH}/${userId}/notifications`);
  const notificationsData = await notificationsPath.once("value");
  const result = [];

  notificationsData.forEach((value) => {
    result.push(value.val());
  });

  return result;
};
