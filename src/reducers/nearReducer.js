
import { 
	INIT,
	GOT_OWNER,
	UPDATED_BALANCE
} from "../actions/nearActions";

const initialState = {
	near: null,
	contract: null,
	walletConnection: null,
	loading: true,
	owner: null,
	daiBalance: null,
}

export default function nearReducer(state = initialState, action) {
	switch(action.type) {
		case INIT: 
			return {
				...state,
				near: action.payload.near,
				walletConnection: action.payload.walletConnection,
				contract: action.payload.contract,
				loading: false,
			}
		case GOT_OWNER: 
			return {
				...state,
				owner: action.payload.owner,
				daiBalance: action.payload.daiBalance,
			}
		case UPDATED_BALANCE:
				return {
					...state,
					daiBalance: action.payload.daiBalance,
				}
		default: 
			return state;
	}
}