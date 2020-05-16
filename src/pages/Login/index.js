import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import "./login.scss";
import iyteLogo from "../../app/assets/images/iyte-logo.gif";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => console.log("jgd");
  const responseGoogle = (response) => {
    //setEmail(response.profileObj.email);
    console.log(response.profileObj.name + " " + response.profileObj.email);
  };

  return (
    <>
      <div id="login-page" className={props.mode}>
        <div id="upper-logo" className={props.mode}>
          <img src={iyteLogo} alt="" />
        </div>
        <Container>
          <div id="login-page-upper" className={props.mode}>
            <h1 id="login-page-header-text" className={props.mode}>
              Graduate Program Application
            </h1>
          </div>
          <div id="login-page-general" className={props.mode}>
            <div id="login-container" className={props.mode}>
              <h1 className={props.mode}>SIGN IN!</h1>
              <FormControl noValidate autoComplete="off">
                <FormGroup row={false}>
                  <div id="login-email-container">
                    <TextField
                      error={false}
                      id="login-email"
                      label="Your e-mail"
                      value={email}
                      className={props.mode}
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
                      className={props.mode}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div id="login-link-container" className={props.mode}>
                    <Link id="login-link" className={props.mode}>
                      Forgot Password
                    </Link>
                  </div>
                  <div id="login-button-container-upper" className={props.mode}>
                    <Button
                      id="login-login-button"
                      className={props.mode}
                      variant="contained"
                      onClick={loginHandler}
                    >
                      <b>SIGN IN</b>
                    </Button>
                  </div>
                  <div
                    id="login-button-container-bottom"
                    className={props.mode}
                  >
                    <Button
                      id="login-register-button"
                      className={props.mode}
                      onClick={loginHandler}
                    >
                      <b>SIGN UP</b>
                    </Button>
                    <GoogleLogin
                      clientId="404982957478-12rkn75au31bnb8q7len0vdindftgumd.apps.googleusercontent.com"
                      buttonText="SIGN IN WITH GOOGLE"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
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
export default connect(mapStateToProps)(Login);
