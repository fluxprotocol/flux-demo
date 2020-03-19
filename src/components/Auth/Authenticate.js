import React, { useEffect, useState } from 'react';
import App from '../App';
import { connect } from 'react-redux';
import { getAuthStatus } from '../../actions/authActions';
import { connectFlux } from '../../actions/fluxActions';
import NearLogin from './NearLogin';
import EnterAccessToken from './EnterAccessToken';
import Loader from './../Loader';
import { AUTH, ONBOARDING, setAccountId } from '../../GAEvents';
import { initialize } from 'react-ga';

// TODO: refactor google analytics events

function Authenticate({flux, dispatch, loading}) {
	useEffect(() => {
		dispatch(connectFlux(window));
	}, [dispatch]);

	if (flux) {
		return <App />
	}
	else if (loading) {
		return <Loader txLoading={true}/>;
	} else {
		return <div>Something went wrong..</div>
	}

}

const mapStateToProps = state => ({
	flux: state.flux.flux,
	loading: state.flux.loading
})


export default connect(mapStateToProps)(Authenticate);
