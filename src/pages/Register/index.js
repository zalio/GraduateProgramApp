import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import iyteLogo from "../../app/assets/images/iyte-logo.gif";
import "./register.scss";
import { connect } from "react-redux";

import { signUpWithEmailAndPassword } from "../../services/firebase";
import {
  registerRequest,
  registerSuccess,
  registerFail,
} from "../../store/actions/auth";
import Container from "@material-ui/core/Container";

const Register = ({ mode, registerRequest, registerSuccess, registerFail }) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const registerHandler = async () => {
    if (
      email === "" ||
      name === "" ||
      surname === "" ||
      password === "" ||
      rePassword === ""
    ) {
      alert("Please enter all fields!");
      return;
    }
    if (password.length < 6) {
      alert("Password must be bigger than or equal to 6!");
      return;
    }
    if (password !== rePassword) {
      alert("Passwords do not match!");
      return;
    }
    registerRequest();
    try {
      const response = await signUpWithEmailAndPassword(email, password);
      console.log(response);
      if (response.operationType === "signIn") {
        registerSuccess();
        alert("You have been signed up !");
        history.push("/");
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
      registerFail();
    }
  };

  return (
    <div id="register-page" className={mode}>
      <div id="upper-logo" className={mode}>
        <img src={iyteLogo} alt="" />
      </div>
      <div id="register-page-upper" className={mode}>
        <Link
          id="register-page-header-link"
          onClick={() => history.push("/")}
          className={mode}
        >
          Graduate Program Application
        </Link>
      </div>
      <div id={"register-page-general"} className={mode}>
        <div id={"register-container"} className={mode}>
          <h1 className={mode}>REGISTER</h1>
          <FormControl noValidate autoComplete={"off"}>
            <FormGroup row={false}>
              <div id={"name-surname-container"} className={mode}>
                <div id={"register-name-container"} className={mode}>
                  <TextField
                    error={false}
                    id={"register-name"}
                    label={"Your Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div id={"register-surname-container"} className={mode}>
                  <TextField
                    error={false}
                    id={"register-surname"}
                    label={"Your Surname"}
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>

              <div id={"register-email-container"} className={mode}>
                <TextField
                  error={false}
                  id={"register-email"}
                  label={"Your E-mail"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div id="register-password-container" className={mode}>
                <TextField
                  type="password"
                  error={false}
                  id="register-password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div id="register-repassword-container" className={mode}>
                <TextField
                  type="password"
                  error={false}
                  id="register-repassword"
                  label="Password again"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </div>
              <div id={"button-container"} className={mode}>
                <Button
                  id={"registerButton"}
                  className={mode}
                  variant="contained"
                  onClick={registerHandler}
                >
                  <b>Register</b>
                </Button>
              </div>
            </FormGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ applicationReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
  };
};
export default connect(mapStateToProps, {
  registerRequest,
  registerSuccess,
  registerFail,
})(Register);
