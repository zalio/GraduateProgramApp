import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_RESPONSE } from "../types";

const INITIAL_STATE = {
  allUsers: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USERS_RESPONSE:
      return { ...state, loading: false, allUsers: action.payload };
    default:
      return state;
  }
};
