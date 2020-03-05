import { API_URL } from './../constants';

export const GET_AUTH_STATUS_BEGIN = 'GET_AUTH_STATUS_BEGIN';
export const GET_AUTH_STATUS_SUCCESS = 'GET_AUTH_STATUS_SUCCESS';
export const GET_AUTH_STATUS_FAILURE = 'GET_AUTH_STATUS_FAILURE';
export const SIGNED_IN = 'SIGNED_IN';
export const 	INVALID_ACCESS_TOKEN = '	INVALID_ACCESS_TOKEN';

export const invalidAccessToken = () => ({
	type: INVALID_ACCESS_TOKEN
})

export const getAuthStatusBegin = () => ({
	type: GET_AUTH_STATUS_BEGIN
});

export const authStatusSuccess = allowed => ({
	type: GET_AUTH_STATUS_SUCCESS,
	payload: {
		allowed
	}
});

export const signedIn = signedIn => ({
	type: SIGNED_IN, 
	payload: {
		signedIn
	}
});

export const authStatusFailure = err => ({
	type: GET_AUTH_STATUS_FAILURE,
	payload: {
		err
	}
});

export const getAuthStatus = (walletAccount, accessToken, account) => {
	return async dispatch => {
		dispatch(getAuthStatusBegin());
		const isSignedIn = walletAccount.isSignedIn();
		dispatch(signedIn(isSignedIn));
		if (!account) return dispatch(authStatusSuccess(false));
		
		const accountId = walletAccount.getAccountId();
		const signature = await signAuthMessage(accountId, account);
		
		if (isSignedIn) {
			const res = await fetch(`${API_URL}/auth_near_account`, {
				method: "POST",
				mode: 'cors',
				cache: 'no-cache',
				credentials: "include",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					signature: Buffer.from(signature.signature, "base64"),
					pubKey: Buffer.from(signature.publicKey.data, "base64"),
					accountId
				}),
			})
			const { success }  = await res.json();
			if (success) dispatch(authStatusSuccess(success));
			else dispatch(checkAccessToken(accessToken, accountId, signature));
			return success;
		} else {
			return dispatch(authStatusSuccess(false))
		}
	}
}

export const checkAccessToken = (accessToken, accountId, signedMessage, account) => {
	return async dispatch => {
		if (!account) return dispatch(authStatusSuccess(false));
		if (!accessToken) return dispatch(invalidAccessToken());
		let signature = !!signedMessage ? signedMessage : await signAuthMessage(accountId, account);

		fetch(`${API_URL}/auth_user`, {
			method: "POST",
			mode: 'cors',
			cache: 'no-cache',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				accessToken,
				signature: Buffer.from(signature.signature, "base64"),
				pubKey: Buffer.from(signature.publicKey.data, "base64"),
				accountId,
			}),
		})
		.then(res => res.json())
		.then(json => {
			const { success } = json;
			if (success) {
				dispatch(authStatusSuccess(success));
			} else {
				dispatch(invalidAccessToken());
			}
		})
		.catch(err => {
			dispatch(authStatusFailure(err))
		})
		
	}

}

const signAuthMessage = (accountId, account) => {
	return new Promise(async (resolve, reject) => {
		const signature	= await account.connection.signer.signMessage("auth", accountId, account.connection.networkId)
		resolve(signature);
	})
	
}