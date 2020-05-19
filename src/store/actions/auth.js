import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  CLEAR_USER_DATA,
} from "../types";

export const loginRequest = () => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
  };
};
export const loginSuccess = (token) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
  };
};
export const loginFail = () => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_FAIL,
    });
  };
};
export const registerRequest = () => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
  };
};
export const registerSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_SUCCESS,
    });
  };
};
export const registerFail = () => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_FAIL,
    });
  };
};
export const forgotPasswordRequest = () => {
  return (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
  };
};
export const forgotPasswordSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
    });
  };
};
export const forgotPasswordFail = () => {
  return (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
    });
  };
};

export const clearUserData = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_USER_DATA,
    });
  };
};
