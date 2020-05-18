import axios from "axios";

export const signUp = (userEmail, userPassword) => {
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHnx4_Yq1KCPu33_IZ1-yCAIqvpoh-H8Y",
      { email: userEmail, password: userPassword, returnSecureToken: true }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const signIn = (userEmail, userPassword) => {
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHnx4_Yq1KCPu33_IZ1-yCAIqvpoh-H8Y",
      { email: userEmail, password: userPassword, returnSecureToken: true }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const changePassword = (userToken, userPassword) => {
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBHnx4_Yq1KCPu33_IZ1-yCAIqvpoh-H8Y",
      { idToken: userToken, password: userPassword, returnSecureToken: true }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const resetPassword = (userEmail) => {
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBHnx4_Yq1KCPu33_IZ1-yCAIqvpoh-H8Y",
      { requestType: "PASSWORD_RESET", email: userEmail }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
