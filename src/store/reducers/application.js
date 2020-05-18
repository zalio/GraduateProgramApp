import { THEME_MODE_CHANGE } from "../types";

const INITIAL_STATE = {
  mode: "dark",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case THEME_MODE_CHANGE:
      return { ...state, mode: state.mode === "light" ? "dark" : "light" };
    default:
      return state;
  }
};
