import React, { useEffect, useState } from 'react';
import App from '../App';
import { connect } from 'react-redux';
import { getAuthStatus } from '../../actions/authActions';
import { initialize } from '../../actions/nearActions';
import NearLogin from './NearLogin';
import { signIn, initializeAccount } from '../../actions/accountActions';
import EnterAccessToken from './EnterAccessToken';
import Loader from './../Loader';
// import RpcConnector from '../../utils/RpcConnector';

function Authenticate({near, account, dispatch, invalidAccessToken, signedIn, walletAccount, success, loading, error,...props}) {
	const [authenticated, setAuthenticated] = useState(false);
	const [accountGot, setAccountGot] = useState(false);
	useEffect(() => {
		dispatch(initialize());
	}, [dispatch]);
	
	if (!accountGot && walletAccount) {
		dispatch(initializeAccount(near, walletAccount));
		setAccountGot(true);
	}
	
	if (!authenticated && account !== null) {
		// const RPC = new RpcConnector(window.nearConfig.nodeUrl, account.connection);
		// RPC.sendRpc();
		dispatch(getAuthStatus(walletAccount, props.match.params.accessToken, account));
		setAuthenticated(true)
	}

	if (signedIn === false) return <NearLogin login={() => signIn(walletAccount)}/>
	if (invalidAccessToken) return <EnterAccessToken account={account} accountId={walletAccount.getAccountId()}/>
	if (error) return <div>{error}</div>
	if (success) return <App />
	else {
		return <Loader txLoading={true}/>;
	}

}

const mapStateToProps = state => ({
	near: state.near.near,
	walletAccount: state.near.walletAccount,
	account: state.account.account,
	success: state.auth.success,
	loading: state.auth.loading,
	error: state.auth.error,
	signedIn: state.auth.signedIn,
	invalidAccessToken: state.auth.invalidAccessToken,
})


export default connect(mapStateToProps)(Authenticate);
