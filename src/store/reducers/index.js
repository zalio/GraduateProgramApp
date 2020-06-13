import { combineReducers } from "redux";
import authReducer from "./auth";
import applicationReducer from "./application";
import usersReducer from "./user";

export default combineReducers({
  authReducer,
  applicationReducer,
  usersReducer,
});
