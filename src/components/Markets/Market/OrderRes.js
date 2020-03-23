import React from 'react';
import styled from 'styled-components';
import { DARK_BLUE, PINK } from '../../../constants';
import ErrorIcon from './../../../assets/error.png'
import SuccessIcon from './../../../assets/success.png'
import ModalButton from '../../ModalButton';
const Container = styled.div`

`;


const ResIcon = styled.img`
	height: 75px;
	width: 75px;
	display: block;
	padding-top: 15px;
	margin: auto;
`;
const Text = styled.p`
	font-size: 19px;
	font-weight: lighter;
	text-align: center;
	padding: 10px 0;
	margin: 0;
	color: ${DARK_BLUE};
`;

const Title = styled.div`
	font-size: 24px;
	font-weight: bold;
	text-align: center;
	padding-top: 45px;
	padding-bottom: 10px;
	color: ${DARK_BLUE};
`;

const BoldText = styled.span`
	font-weight: bold;
`;

const LinkText = styled(Text)`
	text-decoration: underline;
	font-size: 14px;
	cursor: pointer;
`;

export default function OrderRes({amountOfShares, res, closeModal}) {

	return (
		<Container>
			<Title>{!res.error ? "Success" : "Something went wrong"}</Title>
			<ResIcon src={!res.error ? SuccessIcon : ErrorIcon} alt="logo reflecting if the order faield or was successful"/>
			<Text>{!res.error ? "order placed for" : "couldn't place order for"} <BoldText>{amountOfShares.toFixed(2)} shares</BoldText></Text>
			<LinkText onClick = {() => window.open(`https://explorer.nearprotocol.com/transactions/${res.tx}`)}>view tx</LinkText>
			<ModalButton onClick={closeModal} color={res ? DARK_BLUE : PINK}>{res.error ? "Done" : "Close"}</ModalButton>
		</Container>
	)
};