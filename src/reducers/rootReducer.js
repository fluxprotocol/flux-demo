import { combineReducers } from "redux";
import auth from './authReducer';
import near from './nearReducer';
import markets from './marketsReducer';
import account from './accountReducer';
import market from './marketReducer';

export default combineReducers({
	auth,
	account,
	near,
	markets,
	market

})
