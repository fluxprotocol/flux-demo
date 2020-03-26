import React, {useReducer} from 'react';

const initialState = {
	market: null, 
	outcome: null, 
	price: null
};
const reducer = (state, action) => {
	switch(action.type) {
		case 'startOrderPlacement': {
			return state = {
				market: action.payload.market,
				outcome: action.payload.outcome,
				price: action.payload.price
			}
		} 
		case 'stopOrderPlacement': {
			return state = initialState;
		} 
		default : {
			return state;
		}
	}
}

export const OrderContext = React.createContext(initialState)

export const OrderProvider = ({children}) => {
	const [order, dispatch] = useReducer(reducer, initialState)

	return(
		<OrderContext.Provider value={[order, dispatch]}>{children}</OrderContext.Provider>
	)
}