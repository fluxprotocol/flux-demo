export const INIT = "INIT";
export const GOT_OWNER = "GOT_OWNER";
export const UPDATED_BALANCE = "UPDATED_BALANCE";

export const init = (
	near,
	walletConnection,
	contract
) => ({
	type: INIT,
	payload: {
		near,
		walletConnection,
		contract
	}
});

const gotOwner = (owner, daiBalance) => ({
	type: GOT_OWNER,
	payload: {
		owner,
		daiBalance
	}
});

const updatedBalance = daiBalance => ({
	type: UPDATED_BALANCE,
	payload: {
		daiBalance,
	}
});

export const initialize = (ReactGA) => {
	return async dispatch => {
		const near = await new window.nearlib(window.nearConfig).connect(Object.assign({ deps: { keyStore: new window.nearlib.keyStores.BrowserLocalStorageKeyStore() } }));
		const walletConnection = new window.nearlib.WalletConnection(near, window.nearConfig.contractName);
		const accountId = walletConnection.getAccountId();
		const contract = new window.nearlib.Contract(walletConnection.account(), window.nearConfig.contractName, {
			viewMethods: ["get_all_markets","get_market", "get_fdai_balance", "get_market_order","get_market_prices", "get_owner", "get_claimable"],
			changeMethods: ["create_market", "claim_fdai" ,"delete_market", "place_order", "claim_earnings", "resolute_market"],
			sender: accountId,
		});

		dispatch(init (
			near,
			walletConnection,
			contract, 
		))

		if (walletConnection.isSignedIn()) {
			let daiBalance;
			try {
				daiBalance = await contract.get_fdai_balance({from: accountId});
			} 
			catch (err) {
				// ReactGA.event({
				// 	category: "Onboarding",
				// 	action: "User claimed fdai which means this is the accounts first signup",
				// })
				await contract.claim_fdai({}, 1000000000000000);
				daiBalance = await contract.get_fdai_balance({from: accountId});
			}

			const contractOwner = await contract.get_owner();
			dispatch(gotOwner(contractOwner, daiBalance))
		}

		return true;
	}
}

export const updateBalance = (contract, accountId) => {
	return async dispatch => {
		const daiBalance = await contract.get_fdai_balance({from: accountId});
		dispatch(updatedBalance(daiBalance))
	}
}
