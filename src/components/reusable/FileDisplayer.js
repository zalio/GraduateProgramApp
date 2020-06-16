import React, { useState } from "react";
import "./FileDisplayer.scss";

import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";

const FileDisplayer = ({
  mode,
  title,
  dataSrc,
  customControl,
  value,
  setValue,
  userType,
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
      {getCustomControl()}
    </div>
  );
};

export default FileDisplayer;
