import firebase from "./index";

const storage = firebase.storage();
const database = firebase.database();

const APPLICATIONS_REF = "applications";

export const apply = async (applyData) => {
  try {
    const { fileData, applicationId, applicantId } = applyData;
    const fileDataKeys = Object.keys(fileData);

    const dataToSaveDb = {
      applicationId,
      applicantId,
    };

    for (let index = 0; index < fileDataKeys.length; index++) {
      const applyDataKey = fileDataKeys[index];
      const fileDataValue = fileData[applyDataKey];
      if (fileDataValue) {
        const path = `${applicationId}_${applyDataKey}`;
        await storage.ref(path).put(fileDataValue);

        const downloadUrl = await storage.ref(path).getDownloadURL();
        dataToSaveDb[applyDataKey] = downloadUrl;
      }
    }

    await database.ref(APPLICATIONS_REF).push(dataToSaveDb);
  } catch (error) {
    console.log("error: ", error);
  }
};
