import firebase from "./index";

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signUpWithEmailAndPassword = async (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const forgotPasswordWithEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return true;
  } catch (e) {
    return false;
  }
};
