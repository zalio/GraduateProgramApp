import { THEME_MODE_CHANGE } from "../types";

export const themeChanger = () => {
  return (dispatch) => {
    dispatch({
      type: THEME_MODE_CHANGE,
    });
  };
};
