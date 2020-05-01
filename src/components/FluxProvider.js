import React, {useReducer} from 'react';
import Flux from 'flux-sdk';
import { CONTRACT_ID } from '../constants';

const initialState = {
	flux: null,
	balance: null,
};
const reducer = (state, action) => {
	switch(action.type) {
		case 'connected': {
			return state = {
				...state,
				flux: action.payload.flux
			}
		}
		case 'balanceUpdate': {
			return state = {
				...state, 
				balance: action.payload.balance
			};
		}
		default : {
			return state;
		}
	}
}

export const connect = async () => {
	const fluxInstance = new Flux();
  await fluxInstance.connect(CONTRACT_ID);
  if (fluxInstance.walletConnection.isSignedIn()) {
    try {
      await fluxInstance.claimFDai();
    } catch {
    }
  }
  return fluxInstance;
}

export const FluxContext = React.createContext(initialState)

export const FluxProvider = ({children}) => {
	const [flux, dispatch] = useReducer(reducer, initialState)

	return(
		<FluxContext.Provider value={[flux, dispatch]}>{children}</FluxContext.Provider>
	)
}
