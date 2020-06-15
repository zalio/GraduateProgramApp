import firebase from "./index";

const database = firebase.database();
const INTERVIEWS_PATH = "interviews";

export const createInterview = async (interview) => {
  await database.ref(INTERVIEWS_PATH).push(interview);
};
