
import { 
	GOT_MARKETS, LOADING_MARKETS
} from "../actions/marketsActions";

const initialState = {
	markets: [],
	loading: true,
}

export default function fluxProtocolReducer(state = initialState, action) {
	switch(action.type) {
		case LOADING_MARKETS: 
			return {
				...state,
				loading: true
			}
		case GOT_MARKETS: 
			return {
				...state,
				loading: false,
				markets: action.payload.markets
			}
		default: 
			return state;
	}
}