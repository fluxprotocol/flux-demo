import React, { useEffect, useState } from 'react';
import App from '../App';
import { connect } from 'react-redux';
import { getAuthStatus } from '../../actions/authActions';
import { initialize } from '../../actions/nearActions';
import NearLogin from './NearLogin';
import { signIn, initializeAccount } from '../../actions/accountActions';
import EnterAccessToken from './EnterAccessToken';
import Loader from './../Loader';
import ReactGA from 'react-ga';
import { TRACKING_ID } from './../../constants';

ReactGA.initialize(TRACKING_ID);
function Authenticate({near, account, accountId, dispatch, invalidAccessToken, signedIn, walletAccount, success, loading, error,...props}) {
	const [authenticated, setAuthenticated] = useState(false);
	const [accountGot, setAccountGot] = useState(false);
	useEffect(() => {
		ReactGA.event({
			category: "Authentication",
			action: "User started authentication process"
		});
		dispatch(initialize(ReactGA));
	}, [dispatch]);
	
	if (!accountGot && walletAccount) {
		dispatch(initializeAccount(near, walletAccount));
		setAccountGot(true);
	}
	
	if (!authenticated && account !== null) {
		ReactGA.set({
			userId: accountId
		})
		dispatch(getAuthStatus(walletAccount, props.match.params.accessToken, account));
		setAuthenticated(true)
	}

	const nearSignin = () => {
		ReactGA.event({
			category: "Onboarding",
			action: "User clicked NEAR signin"
		})
		signIn(walletAccount)
	}

	if (signedIn === false) return <NearLogin login={nearSignin}/>
	if (invalidAccessToken) {
		ReactGA.event({
			category: "Authentication",
			action: "Unauthenticated user signin"
		})
		return <EnterAccessToken account={account} accountId={walletAccount.getAccountId()}/>
	} 
	if (error) return <div>{error}</div>
	if (success) {
		ReactGA.event({
			category: "Authentication",
			action: "User signedin"
		})
		return <App ReactGA={ReactGA}/>
	}
	else {
		return <Loader txLoading={true}/>;
	}

}

const mapStateToProps = state => ({
	near: state.near.near,
	walletAccount: state.near.walletAccount,
	account: state.account.account,
	accountId: state.account.accountId,
	success: state.auth.success,
	loading: state.auth.loading,
	error: state.auth.error,
	signedIn: state.auth.signedIn,
	invalidAccessToken: state.auth.invalidAccessToken,
})


export default connect(mapStateToProps)(Authenticate);
