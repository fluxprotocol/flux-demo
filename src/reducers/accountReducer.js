
import { 
	INIT_ACCOUNT,
	INIT_ACCOUNT_ID
} from "../actions/accountActions";

const initialState = {
	account: null,
	accountId: null,
	accountState: null,
	allowance: null,
	isSignedIn: null,
}

export default function nearReducer(state = initialState, action) {
	switch(action.type) {
		case INIT_ACCOUNT_ID: 
			return {
				...state,
				accountId: action.payload.accountId,
				isSignedIn: action.payload.isSignedIn
			}
		case INIT_ACCOUNT: 
			return {
				...state,
				account: action.payload.account,
				accountState: action.payload.accountState,
				allowance: action.payload.allowance,
			}
		default: 
			return state;
	}
}