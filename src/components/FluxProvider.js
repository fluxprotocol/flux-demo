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
		const balance = await fluxInstance.getFDaiBalance(fluxInstance.account.accountId);
		if (parseInt(balance) === 0) {
			try {
				await fluxInstance.claimFDai();
			} catch {
				console.log("user just has no balance")
			}
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
