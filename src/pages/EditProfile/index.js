import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import TextField from "@material-ui/core/TextField/TextField";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from "@material-ui/icons/Link";
import FileUpload from "../../components/reusable/FileUpload";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { forgotPasswordWithEmail } from "../../services/firebase/auth";
import "./editProfile.scss";
import { connect } from "react-redux";
import { saveUser } from "../../services/firebase/user";

import { loginSuccess } from "../../store/actions/auth";

const EditProfile = ({ mode, userData, loginSuccess }) => {
  const [name, setName] = useState(userData.name);
  const [surname, setSurname] = useState(userData.surname);
  const [identity, setIdentity] = useState(userData.identity || null);
  const [phone, setPhone] = useState(userData.phone || null);
  const [birth, setBirth] = useState(userData.birth || null);

  const userIsApplicant = () => userData.type !== "applicant";

  const dateChangeHandler = (date) => {
    setBirth(date);
  };

  const sendPasswordHandler = async () => {
    const result = await forgotPasswordWithEmail(userData.email);
    if (!result) alert("Please enter valid email!");
    else {
      alert("Password reset email has been sent to your email!");
    }
  };

  const applyHandler = async () => {
    if (name === "" || surname === "") {
      return alert("Please fill required fields");
    }

    const birthToSave = birth && birth.toString();
    const newUserData = {
      ...userData,
      name,
      surname,
      identity,
      phone,
      birth: birthToSave,
    };
    try {
      await saveUser(newUserData);
      loginSuccess(newUserData);
      alert("Successfully updated!");
    } catch (e) {
      alert("There is an error while submitting!");
    }
  };

  return (
    <div id="edit-page" className={mode}>
      <div id={"edit-page-general"} className={mode}>
        <div id={"edit-container"} className={mode}>
          <h1 className={mode}>EDIT PROFILE</h1>
          <FormControl noValidate autoComplete={"off"}>
            <FormGroup row={false}>
              <div id={"identity-container"} className={mode}>
                <div id={"identity-label"}>
                  <h3 className={mode}>Identity/Passport No:</h3>
                </div>
                <div id={"identity-text-container"} className={mode}>
                  <TextField
                    error={false}
                    id={"edit-identity"}
                    placeholder="Your identity"
                    variant="outlined"
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                  />
                </div>
              </div>

              <div id={"edit-name-surname-container"} className={mode}>
                <div id={"name-surname-label"} className={mode}>
                  <h3 className={mode}>Name Surname:</h3>
                </div>
                <div id={"name-text-container"} className={mode}>
                  <TextField
                    error={false}
                    id={"edit-name"}
                    placeholder="Your name"
                    disabled={userIsApplicant()}
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div id={"surname-text-container"} className={mode}>
                  <TextField
                    error={false}
                    id={"edit-surname"}
                    placeholder="Your Surname"
                    disabled={userIsApplicant()}
                    variant="outlined"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>
              </div>
              <div id={"password-container"} className={mode}>
                <div id={"password-label"}>
                  <h3 className={mode}>Password:</h3>
                </div>
                <div id={"password-text-container"} className={mode}>
                  <IconButton
                    color="primary"
                    component="span"
                    onClick={sendPasswordHandler}
                  >
                    <LinkIcon />
                  </IconButton>
                </div>
              </div>
              <div id={"birth-container"} className={mode}>
                <div id={"birth-label"} className={mode}>
                  <h3 className={mode}>Birth:</h3>
                </div>
                <div id={"date-icon-container"}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        label="Enter Your Birth Date"
                        id="date-picker-dialog"
                        className={mode}
                        format="MM/dd/yyyy"
                        value={birth}
                        onChange={dateChangeHandler}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </div>
              </div>
              <div id={"phone-container"} className={mode}>
                <div id={"phone-label"}>
                  <h3 className={mode}>Phone No:</h3>
                </div>
                <div id={"phone-text-container"} className={mode}>
                  <TextField
                    error={false}
                    id={"edit-phone"}
                    placeholder="Your phone"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div id={"button-container"} className={mode}>
                <Button
                  id={"editButton"}
                  className={mode}
                  variant="contained"
                  onClick={applyHandler}
                >
                  <b>Save</b>
                </Button>
              </div>
            </FormGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ applicationReducer, authReducer }) => {
  const { mode } = applicationReducer;
  const { userData } = authReducer;
  return {
    mode,
    userData,
  };
};

export default connect(mapStateToProps, { loginSuccess })(EditProfile);
