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
} from '../types';

export const loginRequest = () => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
        });
    };
};
export const loginSuccess = (email, token, uid) => {
    return (dispatch) => {
        const userData = {email, token, uid};
        dispatch({
            type: LOGIN_SUCCESS,
            payload: userData,
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