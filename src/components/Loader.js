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

const ResText = styled(Text)`
	text-align: center;
	margin-top: 38px;
`;

const LoadingText = styled(Text)`
	position: absolute;
	left: 0;
	bottom: 10%;
`;


//TODO: Handle status => if true success else failure 
function Loader({txLoading, status}) {
	console.log("being rendered")
	return (
		<StyledSpinner />
	);

}

const mapStateToProps = state => ({
	txLoading: state.market.loading,
	status: state.market.status,
});

export default connect(mapStateToProps)(Loader);
