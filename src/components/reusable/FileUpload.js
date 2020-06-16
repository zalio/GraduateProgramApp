import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const FileUpload = ({ mode, type, changeField, placeholder, disabled }) => {
  const [state, setStateVar] = useState({ selectedFile: null });

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setStateVar({ selectedFile: event.target.files[0] });
    changeField(event.target.files[0]);
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
          disabled={disabled}
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
