import React, { useState } from "react";
import "./sendResult.scss";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FileUpload from "../../components/reusable/FileUpload";
import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const SendResult = ({ mode }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div id="make-announcement-page" className={mode}>
        <Container id="make-announcement-page-container" className={mode}>
          <div>
            <h1>
              <b>Send Interview Result to Program Admin</b>
            </h1>
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
                  label="Program Admin"
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
                <TextField {...params} label="Interviewed Applicant" variant="outlined" />
              )}
            />
          </div>
          <div id="login-email-container">
            <TextField
              error={false}
              id="login-email"
              label="Score (0-100) (optional)"
              className={mode}
            />
          </div>
          <div id="file-uploader">
            <TextField
              id="outlined-multiline-static"
              className={mode}
              label="Extra Information"
              multiline
              rows={10}
              variant="outlined"
            />
          </div>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button id="apply-button" className={mode}>
              SEND
            </Button>
          )}
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

export default connect(mapStateToProps)(SendResult);
