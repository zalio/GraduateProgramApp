import React, { useState } from "react";
import "./FileDisplayer.scss";

import Link from "@material-ui/core/Link";

const FileDisplayer = ({
  mode,
  title,
  dataSrc,
  customControl,
  value,
  setValue,
  userType,
  disabled,
}) => {
  const getCustomControl = () => {
    if (userType === "gradschool" && customControl)
      return customControl(value, setValue);
  };

  return (
    <div className={`file-displayer-container ${mode}`}>
      <div className={`file-displayer-sub-container ${mode}`}>
        <div className={mode}>
          <Link
            className={`file-displayer-link ${mode}`}
            href={dataSrc}
            target="_blank"
          >
            {title}
          </Link>
        </div>
      </div>
      {disabled && disabled !== true ? getCustomControl() : ""}
    </div>
  );
};

export default FileDisplayer;
