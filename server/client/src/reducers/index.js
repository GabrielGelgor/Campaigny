import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer';

export default combineReducers({
    auth: authReducer, //"The auth property of state is managed by the auth reducer"
    form: reduxForm,
    surveys: surveysReducer
});