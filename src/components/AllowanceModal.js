import React from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { DARK_BLUE } from '../constants';
import ModalButton from './ModalButton';
import { signOut } from '../actions/accountActions';

const WarningIcon = styled.span`
	color: red; 
	border: 2px solid red;
	border-radius: 50%;
	text-align: center;
	width: 150px;
	height: 150px;
	font-size: 40px;
`;

const WarningText = styled.p`
	color: ${DARK_BLUE};
	text-align: center;
`


function AllowanceModal() {
	return ( 
		<Modal blackground={true} onBlackgroundClick={() => {}}>
			<WarningIcon>!</WarningIcon>
			<WarningText>We've run out of gas allowance, please sign in again to top up.</WarningText>
			<ModalButton onClick={signOut}>Sign out</ModalButton>
		</Modal>
	);

}

export default AllowanceModal;
