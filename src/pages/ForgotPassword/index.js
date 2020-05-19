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
import { forgotPasswordWithEmail } from "../../services/firebase";

const ForgotPassword = (props) => {
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
      <div id="forgot-password-page" className={props.mode}>
        <div id="upper-logo" className={props.mode}>
          <img src={iyteLogo} alt="" />
        </div>
        <Container>
          <div id="forgot-password-upper" className={props.mode}>
            <h1 id="forgot-password-header-text" className={props.mode}>
              Graduate Program Application
            </h1>
          </div>
          <div id="login-page-general" className={props.mode}>
            <div id="forgot-password-container" className={props.mode}>
              <h1 className={props.mode}>RENEW PASSWORD!</h1>
              <FormControl noValidate autoComplete="off">
                <FormGroup row={false}>
                  <div id="forgot-password-email-container">
                    <TextField
                      error={false}
                      id="forgot-password-email"
                      label="Your e-mail"
                      value={email}
                      className={props.mode}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div
                    id="forgot-password-button-container-upper"
                    className={props.mode}
                  >
                    <Button
                      id="forgot-password-send-button"
                      className={props.mode}
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
