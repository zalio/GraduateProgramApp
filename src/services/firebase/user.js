import firebase from "./index";

const database = firebase.database();
export const USERS_PATH = "users";

export const saveUser = async (user) => {
  const { uid } = user;
  await database.ref(`${USERS_PATH}/${uid}`).set(user);
};

export const getUser = async (uid) => {
  const userRef = database.ref(`${USERS_PATH}/${uid}`);
  const userData = await userRef.once("value");

  return userData.val();
};

export const getUserWithEmail = async (email) => {
  const usersRef = database.ref(`${USERS_PATH}`);
  const userData = await usersRef.orderByChild("email").equalTo(email).once("value");
  const userDataVal = await userData.val();
  const userDataValParsing = userDataVal ? Object.values(userDataVal)[0] : null;

  return userDataValParsing;
};
