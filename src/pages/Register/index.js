import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import "./register.scss";

import { AnimationButton } from "../../components/reusable/AnimationButton";

const Register = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const registerHandler = () => console.log("Kayıt olundu.");

  return (
    <div id="register-page-general">
      <div className={"register-container"}>
        <FormControl noValidate autoComplete={"off"}>
          <FormGroup row={false}>
            <div id={"email-container"}>
              <TextField
                error={false}
                id={"email"}
                label={"Your E-mail"}
                variant={"standard"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div id="password-container">
              <TextField
                type="password"
                error={false}
                id="password"
                label="Password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div id="password-container">
              <TextField
                type="password"
                error={false}
                id="repassword"
                label="Password again"
                variant="standard"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </div>
            <div id={"button-container"}>
              <AnimationButton
                id={"registerButton"}
                title={"Kayıt ol"}
                onClick={registerHandler}
              />
            </div>
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default Register;
