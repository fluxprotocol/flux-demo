import { START_ORDER_PLACE, PLACED_ORDER } from '../actions/marketActions'

const initialState = {
	loading: false,
	marketLoading: null,
	status: null,
}

export default function marketReducer(state = initialState, action) {
	switch(action.type) {
		case START_ORDER_PLACE: 			
			return {
				...state,
				loading: true,
				status: null,
				marketLoading: action.payload.marketId
			};
		case PLACED_ORDER: 
			return {
				...state, 
				loading: false,
				status: action.payload.status,
				marketLoading: null
			}
		default: 
			return state;
	}
}