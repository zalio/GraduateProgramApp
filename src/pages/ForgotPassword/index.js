import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import "./forgotPassword.scss";
import { connect } from "react-redux";
import iyteLogo from "../../app/assets/images/iyte-logo.gif";
import { forgotPasswordWithEmail } from "../../services/firebase/auth";

import Link from "@material-ui/core/Link";
import progLogo from "../../app/assets/images/proglogo.png";
import progLogoLight from "../../app/assets/images/proglogo-light.png";

const ForgotPassword = ({ mode }) => {
  const [email, setEmail] = useState("");

  const history = useHistory();

  const forgotPasswordHandler = async () => {
    const result = await forgotPasswordWithEmail(email);
    if (!result) alert("Please enter valid email!");
    else {
      alert("Password reset email has been sent to your email!");
      history.push("/");
    }
  };

  return (
    <>
      <div id="forgot-password-page" className={mode}>
        <div id="upper-logo" className={mode}>
          <img src={iyteLogo} alt="" />
        </div>
        <Container>
          <div id="forgot-password-page-upper" className={mode}>
            <Link
              id="forgot-password-page-header-link"
              onClick={() => history.push("/")}
              className={mode}
            >
              <img
                id="login-page-logo"
                src={mode === "dark" ? progLogo : progLogoLight}
                alt=""
              />
            </Link>
          </div>
          <div id="login-page-general" className={mode}>
            <div id="forgot-password-container" className={mode}>
              <h1 className={mode}>UPDATE PASSWORD</h1>
              <FormControl noValidate autoComplete="off">
                <FormGroup row={false}>
                  <div id="forgot-password-email-container">
                    <TextField
                      error={false}
                      id="forgot-password-email"
                      label="Your e-mail"
                      value={email}
                      className={mode}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div
                    id="forgot-password-button-container-upper"
                    className={mode}
                  >
                    <Button
                      id="forgot-password-send-button"
                      className={mode}
                      variant="contained"
                      onClick={forgotPasswordHandler}
                    >
                      <b>SEND EMAIL</b>
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

const mapStateToProps = ({ applicationReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
  };
};
export default connect(mapStateToProps)(ForgotPassword);
