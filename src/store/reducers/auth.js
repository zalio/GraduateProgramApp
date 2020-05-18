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
} from "../types";

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        uid: action.payload.uid,
        loading: false,
      };
    case LOGIN_FAIL:
      return { ...state, loading: false };
    case REGISTER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      return { ...state, loading: false };
    case REGISTER_FAIL:
      return { ...state, loading: false };
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false };
    case FORGOT_PASSWORD_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
