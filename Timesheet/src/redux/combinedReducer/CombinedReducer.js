import { combineReducers } from 'redux';
import Login from '../../modules/login/LoginReducer';
export default combineReducers({
	loginReducers: Login
});
