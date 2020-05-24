import {
  THEME_MODE_CHANGE,
  GET_ANNOUNCEMENTS_REQUEST,
  GET_ANNOUNCEMENTS_RESPONSE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_RESPONSE,
} from "../types";

export const themeChanger = () => {
  return (dispatch) => {
    dispatch({
      type: THEME_MODE_CHANGE,
    });
  };
};

export const announcementsRequest = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ANNOUNCEMENTS_REQUEST,
    });
  };
};

export const announcementsResponse = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_ANNOUNCEMENTS_RESPONSE,
      payload: data,
    });
  };
};

export const notificationsRequest = () => {
  return (dispatch) => {
    dispatch({
      type: GET_NOTIFICATIONS_REQUEST,
    });
  };
};

export const notificationsResponse = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_NOTIFICATIONS_RESPONSE,
      payload: data,
    });
  };
};
