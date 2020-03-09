export const INIT_ACCOUNT_ID = "INIT_ACCOUNT_ID";
export const INIT_ACCOUNT = "INIT_ACCOUNT";

export const initializedAccountId = (
	accountId,
	isSignedIn,
) => ({
	type: INIT_ACCOUNT_ID,
	payload: {
		accountId,
		isSignedIn,
	}
});

export const initializedAccount = (
	account,
	accountState,
	allowance,
) => ({
	type: INIT_ACCOUNT,
	payload: {
		account,
		accountState,
		allowance,
	}
});

// Break up and set states that load quicker earlier. 
export const initializeAccount = (near, walletAccount) => {
	return async dispatch => {
		const isSignedIn = walletAccount.isSignedIn();
		const accountId = walletAccount.getAccountId();
		
		dispatch(initializedAccountId (
			accountId,
			isSignedIn,
			));
		let account, accountState, allowance = null;
		if (isSignedIn) {
			account = await near.account(accountId); 
			accountState = await account.state();
			const accountDetails = await account.getAccountDetails();
			// TODO: query RPC for access key instead of arr.find
			const app = accountDetails.authorizedApps.find(app => app.contractId === window.nearConfig.contractName)
			allowance = app.amount;
		}

		dispatch(initializedAccount (
			account,
			accountState,
			allowance,
		));
		return true;
	}
}

export const signIn = (walletAccount) => {
	walletAccount.requestSignIn(
		window.nearConfig.contractName,
		window.nearConfig.contractName,
	);
}

export const signOut = (walletAccount) => {
	walletAccount.signOut();
	window.location.replace(window.location.origin + window.location.pathname);
}