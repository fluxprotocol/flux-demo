import React, {useReducer} from 'react';

const initialState = null;
const reducer = (state, action) => {
	switch(action.type) {
		case 'connected': {
			return state = action.payload.fluxInstance;
		}
		case 'balanceUpdate': {
			return state = {...state, balance: action.payload.balance};
		}
	}
}

export const FluxContext = React.createContext([{}, function() {}])

export const FluxProvider = ({children}) => {
	const [flux, dispatch] = useReducer(reducer, initialState)

	return(
		<FluxContext.Provider value={[flux, dispatch]}>{children}</FluxContext.Provider>
	)
}