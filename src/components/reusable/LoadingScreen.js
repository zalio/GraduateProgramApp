import React from "react";
import Loader from "react-loader-spinner";
import "./loadingScreen.scss";

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <div id="loading-screen-container">
        <Loader type="Puff" color="green" height={130} width={130} />
      </div>
    );
  }
}
