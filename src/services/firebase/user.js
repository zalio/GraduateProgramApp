import firebase from ".";

const database = firebase.database();
const USERS_PATH = "users";

export const saveUser = async (user) => {
  const { uid } = user;
  await database.ref(`${USERS_PATH}/${uid}`).set(user);
};

export const getUser = async (uid) => {
  const userRef = database.ref(`${USERS_PATH}/${uid}`);
  const userData = await userRef.once("value");

  return userData.val();
};
