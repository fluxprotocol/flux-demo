import React from 'react';
import styled from 'styled-components';
import { DARK_BLUE } from '../../../constants';
import fluxLogo from './../../../assets/flux-logo.png'
const Container = styled.div`

`;

const Title = styled.div`
	font-size: 24px;
	font-weight: bold;
	text-align: center;
	padding-top: 45px;
	padding-bottom: 10px;
	color: ${DARK_BLUE};
	
`;

const FluxLogo = styled.img`
	height: 75px;
	width: 75px;
	display: block;
	padding-top: 15px;
	margin: auto;
	animation: wiggle 1.5s linear infinite;

	@keyframes wiggle {
    0% { transform: rotate(0deg); }
   	50% { transform: rotate(0deg); }
   	70% { transform: rotate(30deg); }
   	90% { transform: rotate(-30deg); }
  	100% { transform: rotate(0deg); }
	}


`;

const Text = styled.p`
	font-size: 19px;
	font-weight: lighter;
	text-align: center;
	padding: 10px 0;
	margin: 0;
	padding-bottom: 45px;
	color: ${DARK_BLUE};
`;

const BoldText = styled.span`
	font-weight: bold;
`;
export default function OrderLoader({amountOfShares}) {

	return (
		<Container>
			<Title>Processing</Title>
			<FluxLogo src={fluxLogo}/>
			<Text>placing order for <BoldText>{amountOfShares.toFixed(2)} shares</BoldText></Text>
		</Container>
	)
};