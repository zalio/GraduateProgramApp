import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import NoRouteImg from "../app/assets/images/NoRouteImg.png";
import NoRouteImgDark from "../app/assets/images/NoRouteImgDark.png";
import Button from "@material-ui/core/Button";

const NoRoute = ({ mode }) => {
  const history = useHistory();
  return (
    <div
      style={{
        height: "100vh",
        background: mode === "dark" ? "black" : "white",
      }}
    >
      <Container>
        <img
          style={{ "max-width": "1100px" }}
          src={mode === "light" ? NoRouteImg : NoRouteImgDark}
          alt=""
        />
        <div style={{ display: "flex", "justify-content": "center" }}>
          <Button
            id="apply-button"
            className={mode}
            onClick={() => history.push("/")}
          >
            Go Home
          </Button>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ applicationReducer }) => {
  const { mode } = applicationReducer;
  return {
    mode,
  };
};
export default connect(mapStateToProps)(NoRoute);
