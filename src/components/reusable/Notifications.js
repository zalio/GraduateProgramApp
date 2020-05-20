import React from "react";
import CustomCard from "./CustomCard";
import "./notifications.scss";

const Notifications = () => {
  return (
    <>
      <div>
        <p>Notifications</p>
        <div id="notifications-part">
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
          <CustomCard />
        </div>
      </div>
    </>
  );
};

export default Notifications;
