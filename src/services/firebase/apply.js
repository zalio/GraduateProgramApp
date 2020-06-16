import firebase from "./index";

const storage = firebase.storage();
const database = firebase.database();

const APPLICATIONS_REF = "applications";

export const apply = async (applyData) => {
  try {
    const {
      fileData,
      announcementId,
      applicantId,
      status,
      createdAt,
    } = applyData;
    const fileDataKeys = Object.keys(fileData);
    console.log(fileDataKeys);
    const dataToSaveDb = {
      announcementId,
      applicantId,
      status,
      createdAt,
    };

    for (let index = 0; index < fileDataKeys.length; index++) {
      const applyDataKey = fileDataKeys[index];
      const fileDataValue = fileData[applyDataKey];
      if (fileDataValue) {
        const path = `${announcementId}_${applyDataKey}_${applicantId}`;
        await storage.ref(path).put(fileDataValue);
        const downloadUrl = await storage.ref(path).getDownloadURL();
        console.log(downloadUrl);

        dataToSaveDb[applyDataKey] = downloadUrl;
      }
    }

    await database.ref(APPLICATIONS_REF).push(dataToSaveDb);
  } catch (error) {
    console.log("error: ", error);
  }
};
