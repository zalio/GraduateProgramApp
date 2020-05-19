import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHnx4_Yq1KCPu33_IZ1-yCAIqvpoh-H8Y",
  authDomain: "graduateprogramapp.firebaseapp.com",
  databaseURL: "https://graduateprogramapp.firebaseio.com",
  projectId: "graduateprogramapp",
  storageBucket: "graduateprogramapp.appspot.com",
  messagingSenderId: "789747717518",
  appId: "1:789747717518:web:e71fd015f8aee0628c80df",
  measurementId: "G-ZCBCQZHY3D",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await auth.signInWithPopup(provider);
  return result;
};

export const signInWithEmailAndPassword = async (email, password) => {
  const result = await auth.signInWithEmailAndPassword(email, password);
  return result;
};

export const signUpWithEmailAndPassword = async (email, password) => {
  const result = await auth.createUserWithEmailAndPassword(email, password);
  return result;
};

export const forgotPasswordWithEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return true;
  } catch (e) {
    return false;
  }
};

export default firebase;
