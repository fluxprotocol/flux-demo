import React from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { DARK_BLUE } from '../constants';
import ModalButton from './ModalButton';
import { signOut } from '../actions/accountActions';
import { connect } from 'react-redux';

const WarningIcon = styled.span`
	color: red; 
	border: 2px solid red;
	border-radius: 50%;
	text-align: center;
	display: block;
	width: 45px;
	font-size: 40px;
	margin: auto;
	margin-top: 25px;
`;

const WarningText = styled.p`
	color: ${DARK_BLUE};
	text-align: center;
`
const StyledModalButton = styled(ModalButton)`
	color: ${DARK_BLUE};
	border-color: ${DARK_BLUE};
	background-color: ${DARK_BLUE};
`;

function AllowanceModal({walletConnection}) {
	return ( 
		<Modal blackground={true} onBlackgroundClick={() => {}}>
			<WarningIcon>!</WarningIcon>
			<WarningText>Out of gas, please sign in again to top up.</WarningText>
			<StyledModalButton onClick={() => signOut(walletConnection)}>Sign out</StyledModalButton>
		</Modal>
	);

}

const mapStateToProps = state => ({
	walletConnection: state.near.walletConnection
})

export default connect(mapStateToProps)(AllowanceModal);
