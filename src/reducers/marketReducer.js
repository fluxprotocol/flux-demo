import { START_ORDER_PLACE, PLACED_ORDER, GET_ORDER_MODAL } from '../actions/marketActions'

const initialState = {
	loading: false,
	marketLoading: null,
	status: null,
	selectedMarket: null,
	selectedOutcome: null
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
		case GET_ORDER_MODAL:
			return {
				...state,
				selectedMarket: action.payload.market,
				selectedOutcome: action.payload.outcome,
			}
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