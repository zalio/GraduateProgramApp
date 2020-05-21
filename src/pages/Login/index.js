import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import iyteLogo from "../../app/assets/images/iyte-logo.gif";
import googleLogo from "../../app/assets/images/google-logo.png";
import { loginRequest, loginSuccess, loginFail } from "../../store/actions/auth";
import { signInWithEmailAndPassword, signInWithGoogle } from "../../services/firebase/auth";
import { getUser, saveUser } from "../../services/firebase/user";
import "./login.scss";

export const SESSION_STORAGE_KEY = "@SESSION";

const Login = ({ mode, loginRequest, loginSuccess, loginFail, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const loginHandler = async () => {
    loginRequest();
    if (email === "" || password === "") {
      alert("Please enter all fields!");
      loginFail();
      return;
    }
    try {
      const response = await signInWithEmailAndPassword(email, password);
      if (response.operationType === "signIn") {
        localStorage.setItem(SESSION_STORAGE_KEY, response.user.uid);
        const userData = await getUser(response.user.uid);
        loginSuccess(userData);
        history.push("/dashboard");
      }
    } catch (e) {
      alert(e.message);
      loginFail();
    }
  };

  const googleHandler = async () => {
    const response = await signInWithGoogle();
    if (response.operationType === "signIn") {
      localStorage.setItem(SESSION_STORAGE_KEY, response.user.uid);

      const userData = await getUser(response.user.uid);
      if (!userData) {
        const { additionalUserInfo, user } = response;
        const { uid } = user;
        const { profile } = additionalUserInfo;
        const { email, given_name: name, family_name: surname } = profile;
        const userDataToSave = { uid, email, name, surname, type: "applicant" };

        await saveUser(userDataToSave);
        loginSuccess(userDataToSave);
      } else {
        loginSuccess(userData);
      }

      history.push("/dashboard");
    }
  };

  return (
    <>
      <div id="login-page" className={mode}>
        <div id="upper-logo" className={mode}>
          <img src={iyteLogo} alt="" />
        </div>
        <Container>
          <div id="login-page-upper" className={mode}>
            <h1 id="login-page-header-text" className={mode}>
              Graduate Program Application
            </h1>
          </div>
          <div id="login-page-general" className={mode}>
            <div id="login-container" className={mode}>
              <h1 className={mode}>SIGN IN</h1>
              <FormControl noValidate autoComplete="off">
                <FormGroup row={false}>
                  <div id="login-email-container">
                    <TextField
                      error={false}
                      id="login-email"
                      label="Your e-mail"
                      value={email}
                      className={mode}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div id="login-password-container">
                    <TextField
                      type="password"
                      error={false}
                      id="login-password"
                      label="Password"
                      value={password}
                      className={mode}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div id="login-link-container" className={mode}>
                    <Link
                      id="login-link"
                      onClick={() => history.push("/forgot-password")}
                      className={mode}
                    >
                      Forgot Password
                    </Link>
                  </div>
                  <div id="login-button-container-upper" className={mode}>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        id="login-login-button"
                        className={mode}
                        variant="contained"
                        onClick={loginHandler}
                      >
                        <b>SIGN IN</b>
                      </Button>
                    )}
                  </div>
                  <div id="login-button-container-bottom" className={mode}>
                    <Button
                      id="login-register-button"
                      className={mode}
                      onClick={() => history.push("/register")}
                    >
                      <b>SIGN UP</b>
                    </Button>
                    <Button id="google-login-button" onClick={googleHandler}>
                      <img id="google-login-button-img" src={googleLogo} alt="" />
                      SIGN IN WITH GOOGLE
                    </Button>
                  </div>
                </FormGroup>
              </FormControl>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = ({ applicationReducer, authReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
    loading: authReducer.loading,
  };
};
const mapDispatchToProps = {
  loginRequest,
  loginSuccess,
  loginFail,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
