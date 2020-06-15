import firebase from "./index";
import { getUser } from "./user";
import { getAnnouncementData } from "./announcement";
import { app } from "firebase";

const database = firebase.database();

const APPLICATIONS_REF = "applications";

export const getApplications = async () => {
  const applicationsRef = database.ref(APPLICATIONS_REF);
  const applicationsData = await applicationsRef.once("value");
  const applicationsDataAsArray = [];
  const result = [];

  applicationsData.forEach((application) => {
    applicationsDataAsArray.push({
      ...application.val(),
      id: application.key,
    });
  });

  for (let index = 0; index < applicationsDataAsArray.length; index++) {
    const { applicantId, announcementId } = applicationsDataAsArray[index];
    const applicantData = await getUser(applicantId);
    const { name: applicantName, email: applicantEmail } = applicantData;

    const announcementData = await getAnnouncementData(announcementId);
    const {
      department: { title },
      applicationType,
    } = announcementData;

    result.push({
      ...applicationsDataAsArray[index],
      applicantName,
      applicantEmail,
      department: title,
      applicationType,
    });
  }

  return result;
};

export const saveApplication = async (application) => {
  const { id } = application;
  await database.ref(`${APPLICATIONS_REF}/${id}`).set(application);
};

export const deleteApplication = async (application) => {
  const { id } = application;
  await database.ref(`${APPLICATIONS_REF}/${id}`).remove();
};
