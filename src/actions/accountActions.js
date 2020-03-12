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
export const initializeAccount = (near, walletConnection) => {
	return async dispatch => {
		const isSignedIn = walletConnection.isSignedIn();
		const accountId = walletConnection.getAccountId();

		dispatch(initializedAccountId (
			accountId,
			isSignedIn,
		));
		let account, accountState, allowance = null;
		if (isSignedIn) {
			account = await near.account(accountId); 
			accountState = await account.state();
		}

		dispatch(initializedAccount (
			account,
			accountState,
			allowance,
		));
		return true;
	}
}

export const signIn = (walletConnection) => {
	walletConnection.requestSignIn(
		window.nearConfig.contractName,
		window.nearConfig.contractName,
	);
}

export const signOut = (walletConnection) => {
	walletConnection.signOut();
	window.location.replace(window.location.origin + window.location.pathname);
}