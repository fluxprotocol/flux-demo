import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import Modal from './Modal';
import { connect } from 'react-redux';

const StyledSpinner = styled(Spinner) `
	left: calc(50% - 32px);
	top: calc(50vh - 32px);
`;

const Text = styled.div`
	text-align: center;
	width: 100%;
	display: block;
`;

function Loader() {
	return (
		<StyledSpinner />
	);

}

const mapStateToProps = state => ({
	txLoading: state.market.loading,
	status: state.market.status,
});

export default connect(mapStateToProps)(Loader);
