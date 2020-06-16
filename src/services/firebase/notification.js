import { v4 as uuidv4 } from "uuid";

import firebase from "./index";

import { USERS_PATH, getAllUser } from "./user";

const notificationsPath = "notifications";

const database = firebase.database();
const storage = firebase.storage();

export const sendNotification = async (notification) => {
  const { receiverId, file } = notification;
  const userNotificationsPath = `${USERS_PATH}/${receiverId}/${notificationsPath}`;
  const dataToSaveDb = { ...notification };

  if (file) {
    const path = `notification_file_${uuidv4()}`;
    await storage.ref(path).put(file);
    const downloadUrl = await storage.ref(path).getDownloadURL();

    dataToSaveDb["file"] = downloadUrl;
  }

  await database.ref(userNotificationsPath).push(dataToSaveDb);
};

export const sendNotificationToUsers = async (notification, users) => {
  const { file } = notification;
  const dataToSaveDb = { ...notification };

  if (file) {
    const path = `notification_file_${uuidv4()}`;
    await storage.ref(path).put(file);
    const downloadUrl = await storage.ref(path).getDownloadURL();

    dataToSaveDb["file"] = downloadUrl;
  }

  users.forEach(async (user) => {
    const { uid } = user;
    notification = { ...notification, receiverId: uid };
    const userNotificationsPath = `${USERS_PATH}/${uid}/${notificationsPath}`;
    await database.ref(userNotificationsPath).push(dataToSaveDb);
  });
};

export const getUserNotifications = async (userId, setData) => {
  const notificationsPath = database.ref(
    `${USERS_PATH}/${userId}/notifications`
  );
  var result = [];

  notificationsPath.on("value", (snapshot) => {
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

    setData(result.reverse());
  });
};
