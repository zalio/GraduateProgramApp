import React from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./header.scss";
import { SESSION_STORAGE_KEY } from "../../pages/Login";
import { clearUserData } from "../../store/actions/auth";
import Link from "@material-ui/core/Link";
import progLogo from "../../app/assets/images/proglogo.png";
import progLogoLight from "../../app/assets/images/proglogo-light.png";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import NotificationsActiveTwoToneIcon from "@material-ui/icons/NotificationsActiveTwoTone";
import PostAddTwoToneIcon from "@material-ui/icons/PostAddTwoTone";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import LibraryBooksTwoToneIcon from "@material-ui/icons/LibraryBooksTwoTone";
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";
import NoteAddTwoToneIcon from "@material-ui/icons/NoteAddTwoTone";
import CustomPopover from "./CustomPopover";

const Header = ({ themeButton, clearUserData, loading, mode, userData }) => {
  const location = useLocation();
  const history = useHistory();
  const { name, type } = userData;
  const onExitPress = async () => {
    clearUserData();
    localStorage.removeItem(SESSION_STORAGE_KEY);
    history.push("/");
  };
  return (
    <AppBar id="header-bar" position="static" className={mode}>
      <Toolbar>
        <div id="header-upper-container" className={mode}>
          <Link
            id="header-logo-link"
            onClick={() => history.push("/")}
            className={mode}
          >
            <img
              id="header-logo"
              src={mode === "light" ? progLogo : progLogoLight}
              alt=""
            />
          </Link>
          {type !== "applicant" ? (
            <div id="header-user-info">
              {type === "gradschool" ? (
                <b>You are a GradSchool user</b>
              ) : userData.isAdmin === "true" ? (
                <p>
                  You are a <b>Program Coordinator</b> in{" "}
                  <b>{userData.department}</b>
                </p>
              ) : (
                <p>
                  You are a <b>Department Lecturer</b> in{" "}
                  <b>{userData.department}</b>
                </p>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div id="header-bottom-container">
          <div>
            <Typography variant="h6">
              Welcome, <span id="header-user-name">{name}</span>
            </Typography>
          </div>
          <CustomPopover
            popoverContent={() => "CHANGE THEME"}
            buttonContent={themeButton}
          />

          {type === "department" && userData.isAdmin !== "true" ? (
            <CustomPopover
              popoverContent={() => "SEND INTERVIEW RESULT"}
              buttonContent={() => (
                <Button
                  id="exit-button"
                  className={
                    mode +
                    ` ${
                      location.pathname === "/send-result" ? "active-page" : ""
                    }`
                  }
                  variant="contained"
                  onClick={() => history.push("/send-result")}
                >
                  <SendTwoToneIcon />
                </Button>
              )}
            />
          ) : (
            ""
          )}
          {type === "department" && userData.isAdmin === "true" ? (
            <CustomPopover
              popoverContent={() => "SEND RESULT TO GRADSCHOOL"}
              buttonContent={() => (
                <Button
                  id="exit-button"
                  className={
                    mode +
                    ` ${
                      location.pathname === "/send-result-to-gradschool"
                        ? "active-page"
                        : ""
                    }`
                  }
                  variant="contained"
                  onClick={() => history.push("/send-result-to-gradschool")}
                >
                  <SendTwoToneIcon />
                </Button>
              )}
            />
          ) : (
            ""
          )}
          {type === "department" && userData.isAdmin === "true" ? (
            <CustomPopover
              popoverContent={() => "CREATE INTERVIEW"}
              buttonContent={() => (
                <Button
                  id="exit-button"
                  className={
                    mode +
                    ` ${
                      location.pathname === "/create-interview"
                        ? "active-page"
                        : ""
                    }`
                  }
                  variant="contained"
                  onClick={() => history.push("/create-interview")}
                >
                  <NoteAddTwoToneIcon />
                </Button>
              )}
            />
          ) : (
            ""
          )}
          {type !== "applicant" ? (
            <CustomPopover
              popoverContent={() => "VIEW APPLICATIONS"}
              buttonContent={() => (
                <Button
                  id="exit-button"
                  className={
                    mode +
                    ` ${
                      location.pathname === "/view-applications"
                        ? "active-page"
                        : ""
                    }`
                  }
                  variant="contained"
                  onClick={() => history.push("/view-applications")}
                >
                  <LibraryBooksTwoToneIcon />
                </Button>
              )}
            />
          ) : (
            ""
          )}
          {type === "gradschool" ? (
            <CustomPopover
              popoverContent={() => "MAKE ANNOUNCEMENT"}
              buttonContent={() => (
                <Button
                  id="exit-button"
                  className={
                    mode +
                    ` ${
                      location.pathname === "/make-announcement"
                        ? "active-page"
                        : ""
                    }`
                  }
                  variant="contained"
                  onClick={() => history.push("/make-announcement")}
                >
                  <PostAddTwoToneIcon />
                </Button>
              )}
            />
          ) : (
            ""
          )}
          {type !== "applicant" ? (
            <CustomPopover
              popoverContent={() => "SEND NOTIFICATION"}
              buttonContent={() => (
                <Button
                  id="exit-button"
                  className={
                    mode +
                    ` ${
                      location.pathname === "/send-notification"
                        ? "active-page"
                        : ""
                    }`
                  }
                  variant="contained"
                  onClick={() => history.push("/send-notification")}
                >
                  <NotificationsActiveTwoToneIcon />
                </Button>
              )}
            />
          ) : (
            ""
          )}
          <CustomPopover
            popoverContent={() => "EDIT PROFILE"}
            buttonContent={() => (
              <Button
                id="exit-button"
                className={
                  mode +
                  ` ${
                    location.pathname === "/edit-profile" ? "active-page" : ""
                  }`
                }
                variant="contained"
                onClick={() => history.push("/edit-profile")}
              >
                <AccountCircleTwoToneIcon />
              </Button>
            )}
          />
          <CustomPopover
            popoverContent={() => "EXIT"}
            buttonContent={() => (
              <Button
                id="exit-button"
                className={mode}
                variant="contained"
                onClick={onExitPress}
              >
                <ExitToAppSharpIcon />
              </Button>
            )}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ authReducer, applicationReducer }) => {
  const { loading, userData } = authReducer;
  const { mode } = applicationReducer;
  return {
    loading,
    mode,
    userData,
  };
};

const mapDispatchToProps = {
  clearUserData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
