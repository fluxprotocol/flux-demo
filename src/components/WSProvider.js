import React, {useReducer} from 'react';

const initialState = null;
const reducer = (state, action) => {
	switch(action.type) {
		case 'webSocketConnected': {
			return state = action.payload;
		}
		default: {
			return state;
		}
	}	
}

export const WebSocketContext = React.createContext(initialState);

export const WSProvider = ({children}) => {
	const [socket, dispatch] = useReducer(reducer, initialState)

	return(
		<WebSocketContext.Provider value={[socket, dispatch]}>{children}</WebSocketContext.Provider>
	)
}