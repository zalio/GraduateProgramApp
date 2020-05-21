import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const FileUpload = ({ mode, type, changeField, placeholder }) => {
  const [state, setStateVar] = useState({ selectedFile: null });

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setStateVar({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", state.selectedFile, state.selectedFile.name);

    // Details of the uploaded file
    console.log(state.selectedFile);

    // Request made to the backend api
    // Send formData object
    console.log(formData);
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {state.selectedFile.name}</p>
          <p>File Type: {state.selectedFile.type}</p>
          <p>
            Last Modified: {state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div id="file-uploader">
      <div id="file-upload-container" className={mode}>
        <div id="file-upload-placeholder" className={mode}>
          {state.selectedFile ? state.selectedFile.name : placeholder}
        </div>
        <Button
          id="file-upload-button"
          variant="contained"
          component="label"
          className={mode}
        >
          {mode === "dark" ? <AddCircleOutlineIcon /> : <AddCircleIcon />}
          <input
            type="file"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
