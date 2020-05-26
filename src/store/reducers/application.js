import {
  THEME_MODE_CHANGE,
  GET_ANNOUNCEMENTS_REQUEST,
  GET_ANNOUNCEMENTS_RESPONSE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_RESPONSE,
} from "../types";

const INITIAL_STATE = {
  mode: "light",
  announcements: [],
  notifications: [],
  applications: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case THEME_MODE_CHANGE:
      return { ...state, mode: state.mode === "light" ? "dark" : "light" };
    case GET_ANNOUNCEMENTS_REQUEST:
      return { ...state, loading: true };
    case GET_ANNOUNCEMENTS_RESPONSE:
      return { ...state, loading: false, announcements: action.payload };
    case GET_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true };
    case GET_NOTIFICATIONS_RESPONSE:
      return { ...state, loading: false, notifications: action.payload };
    default:
      return state;
  }
};
