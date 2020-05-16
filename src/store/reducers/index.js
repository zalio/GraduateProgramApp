import {combineReducers} from 'redux';
import authReducer from './auth';
import applicationReducer from './application';

export default combineReducers({
    authReducer,
    applicationReducer,
});