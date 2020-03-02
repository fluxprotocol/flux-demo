export const INIT = "INIT";
export const GOT_OWNER = "GOT_OWNER";
export const UPDATED_BALANCE = "UPDATED_BALANCE";

export const init = (
	near,
	walletAccount,
	contract
) => ({
	type: INIT,
	payload: {
		near,
		walletAccount,
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

export const initialize = () => {
	return async dispatch => {
		const near = await window.nearlib.connect(Object.assign({ deps: { keyStore: new window.nearlib.keyStores.BrowserLocalStorageKeyStore() } }, window.nearConfig));
		const walletAccount = new window.nearlib.WalletAccount(near);
		const accountId = walletAccount.getAccountId();
		const contract = await near.loadContract(window.nearConfig.contractName, {
			viewMethods: ["get_all_markets", "get_fdai_balance", "get_market", "get_market_order","get_market_prices", "get_owner", "get_earnings", "get_open_orders", "get_filled_orders", "get_fdai_metrics"],
			changeMethods: ["create_market", "claim_fdai" ,"delete_market", "place_order", "claim_earnings", "resolute_market"],
			sender: accountId,
		});

		dispatch(init (
			near,
			walletAccount,
			contract, 
		))

		if (walletAccount.isSignedIn()) {
			let daiBalance;
			try {
				daiBalance = await contract.get_fdai_balance({from: accountId});
			} 
			catch (err) {
				await contract.claim_fdai({}, 10000000000000);
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
