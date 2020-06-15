import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_RESPONSE } from "../types";

export const allUsersRequest = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_USERS_REQUEST,
    });
  };
};
export const allUsersResponse = (users) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_USERS_RESPONSE,
      payload: users,
    });
  };
};
