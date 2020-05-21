import React, { useState } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "./CustomCard.scss";
import Divider from "@material-ui/core/Divider";

const CustomCard = ({ mode, customButton, type }) => {
  const [buttonIconDown, setButtonIconDown] = useState(true);
  const [contentWidthClass, setContentWidthClass] = useState("small");
  return (
    <Card className={mode}>
      <CardContent
        className={mode + ` ${contentWidthClass}`}
        classes={contentWidthClass}
      >
        <div id="card-upper-text-container" className={mode}>
          <div id="card-upper-text-sub-container" className={mode}>
            <span>
              <b>From:</b>
            </span>
            <span>Rıdvan Mertoğlu</span>
          </div>
          <div id="card-upper-text-sub-container" className={mode}>
            <span>
              <b>Date:</b>
            </span>
            <span>03/06/1998</span>
          </div>
        </div>
        <Divider className={mode} />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad
        animi blanditiis commodi eum fugit nulla quo reiciendis suscipit vitae!
        Accusantium consectetur eveniet iste officiis, possimus quae quaerat
        quas voluptatum? Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Aliquam commodi eaque fugiat fugit nobis similique temporibus
        velit voluptas? Aperiam aspernatur cum dolore ducimus eaque labore
        laboriosam provident quis ratione tempore?
        <div id="custom-button-container" className={mode}>
          {customButton ? customButton() : ""}
        </div>
      </CardContent>
      <CardActions className={mode}>
        <Button
          id="card-button"
          className={mode}
          onClick={() => {
            setButtonIconDown(!buttonIconDown);
            setContentWidthClass(
              contentWidthClass === "small" ? "big" : "small"
            );
          }}
          size="small"
        >
          {buttonIconDown ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = ({ applicationReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
  };
};

export default connect(mapStateToProps)(CustomCard);
