import firebase from "firebase";

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

export default firebase;
