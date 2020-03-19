
import { 
	CONNECTING,
	CONNECTED
} from "../actions/fluxActions";

const initialState = {
	flux: null,
	loading: null
}

export default function nearReducer(state = initialState, action) {
	switch(action.type) {
		case CONNECTING: 
			return {
				...state,
				loading: true,
			}
		case CONNECTED: 
			return {
				...state,
				loading: false,
				flux: action.payload.flux,
			}
		default: 
			return state;
	}
}