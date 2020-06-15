import firebase from "./index";
import { USERS_PATH } from "./user";

const database = firebase.database();
const INTERVIEWS_PATH = "interviews";

export const createInterview = async (interview) => {
  await database.ref(INTERVIEWS_PATH).push(interview);
};

export const saveInterview = async (interview) => {
  const { iid } = interview;
  await database.ref(`${INTERVIEWS_PATH}/${iid}`).set(interview);
};

export const getAllInterviews = async () => {
  const usersRef = database.ref(`${INTERVIEWS_PATH}`);
  const usersData = await usersRef.once("value");

  const result = [];

  usersData.forEach((value) => {
    result.push({ ...value.val(), iid: value.key });
  });

  return result;
};
