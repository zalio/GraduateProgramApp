import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import FileUpload from "../../components/reusable/FileUpload";
import Container from "@material-ui/core/Container";
import "./DetermineInterview.scss";
import Button from "@material-ui/core/Button";
import { apply } from "../../services/firebase/apply";
import { CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";

const DetermineInterview = ({ mode, userData }) => {
  const location = useLocation();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //if (location.state) setApplicationData(location.state.application);
    //else history.push("/");
  }, []);

  return (
    <div id="make-announcement-page" className={mode}>
      <Container id="make-announcement-page-container" className={mode}>
        <div id="apply-page-upper-text" className={mode}>
          Choose the Interviewers
        </div>
        <div id="apply-page-insider">
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              options={[]}
              getOptionLabel={(option) => option.title}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewer 1 Email"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              options={[]}
              getOptionLabel={(option) => option.title}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewer 2 Email"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              options={[]}
              getOptionLabel={(option) => option.title}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewer 3 Email"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              options={[]}
              getOptionLabel={(option) => option.title}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewer 4 Email"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id="file-uploader">
            <Autocomplete
              id="combo-box-demo"
              className={mode}
              options={[]}
              getOptionLabel={(option) => option.title}
              style={{ width: 1100 }}
              openOnFocus
              blurOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Interviewer 5 Email"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div id={"birth-container"} className={mode}>
            <div id={"birth-label"} className={mode}>
              <h3 className={mode}>Date and Location</h3>
            </div>
            <div id={"date-icon-container"}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    label="Choose Date"
                    id="date-picker-dialog"
                    className={mode}
                    format="MM/dd/yyyy"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div id="login-email-container">
            <TextField
              error={false}
              id="login-email"
              label="Location"
              className={mode}
            />
          </div>
        </div>
        <div id="apply-button-container">
          {loading ? (
            <CircularProgress />
          ) : (
            <Button id="apply-button" className={mode}>
              SAVE
            </Button>
          )}
        </div>
      </Container>
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

export default connect(mapStateToProps)(DetermineInterview);
