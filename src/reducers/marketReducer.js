import { START_ORDER_PLACE, PLACED_ORDER, GET_ORDER_MODAL, ORDER_CANCELED } from '../actions/marketActions'

const initialState = {
	loading: false,
	res: null,
	selectedMarket: null,
	selectedOutcome: null,
	marketPrice: null,
	orderCanceled: true,
}

export default function marketReducer(state = initialState, action) {
	switch(action.type) {
		case ORDER_CANCELED:
			return{
				...state
		}
		case START_ORDER_PLACE: 
			return {
				...state,
				loading: true,
				status: null,
				amountOfShares: action.payload.amountOfShares
			};
		case GET_ORDER_MODAL:
			return {
				...state,
				selectedMarket: action.payload.market,
				selectedOutcome: action.payload.outcome,
				marketPrice: action.payload.marketPrice,
				res: null,
				updateMarketOrders: action.payload.updateMarketOrders,
			}
		case PLACED_ORDER: 
			return {
				...state, 
				loading: false,
				res: action.payload.res,
			}
		default: 
			return state;
	}
}