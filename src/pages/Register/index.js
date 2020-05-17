import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./register.scss";
import { connect } from "react-redux";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const registerHandler = () => console.log("Kayıt olundu.");

  return (
    <div id="register-page" className={props.mode}>
      <div id={"register-page-general"} className={props.mode}>
        <div id={"register-container"} className={props.mode}>
          <FormControl noValidate autoComplete={"off"}>
            <FormGroup row={false}>
              <div id={"name-surname-container"} className={props.mode}>
                <div id={"register-name-container"} className={props.mode}>
                  <TextField
                    error={false}
                    id={"register-name"}
                    label={"Your Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div id={"register-surname-container"} className={props.mode}>
                  <TextField
                    error={false}
                    id={"register-surname"}
                    label={"Your Surname"}
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>

              <div id={"register-email-container"} className={props.mode}>
                <TextField
                  error={false}
                  id={"register-email"}
                  label={"Your E-mail"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div id="register-password-container" className={props.mode}>
                <TextField
                  type="register-password"
                  error={false}
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div id="register-repassword-container" className={props.mode}>
                <TextField
                  type="password"
                  error={false}
                  id="register-repassword"
                  label="Password again"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </div>
              <div id={"button-container"} className={props.mode}>
                <Button
                  id={"registerButton"}
                  className={props.mode}
                  variant="contained"
                  onClick={registerHandler}
                >
                  <b>Kayıt ol</b>
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
export default connect(mapStateToProps)(Register);
