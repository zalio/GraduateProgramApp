import React, { useState } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "./CustomCard.scss";

const CustomCard = ({ mode, customButton }) => {
  const [buttonIconDown, setButtonIconDown] = useState(true);
  const [contentWidthClass, setContentWidthClass] = useState("small");
  return (
    <Card className={mode}>
      <CardContent
        className={mode + ` ${contentWidthClass}`}
        classes={contentWidthClass}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad
        animi blanditiis commodi eum fugit nulla quo reiciendis suscipit vitae!
        Accusantium consectetur eveniet iste officiis, possimus quae quaerat
        quas voluptatum? Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Aliquam commodi eaque fugiat fugit nobis similique temporibus
        velit voluptas? Aperiam aspernatur cum dolore ducimus eaque labore
        laboriosam provident quis ratione tempore?
      </CardContent>
      <CardActions className={mode}>
        {customButton ? (
          customButton()
        ) : (
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
            {buttonIconDown ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowUpIcon />
            )}
          </Button>
        )}
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
