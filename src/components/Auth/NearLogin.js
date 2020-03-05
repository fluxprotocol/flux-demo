import React from 'react';
import styled from 'styled-components';
import { DARK_BLUE } from '../../constants';
import fluxLogo from '../../assets/flux-logo-white.png';
import nearLogo from '../../assets/near-logo-blue.svg';

const NearLogo = styled.img`
	height: 24px;
	position: inline;
	vertical-align: middle;
	margin-left: 5px;
`

const Logo = styled.img`
	width: 80%;
	max-width: 250px;
	margin: auto;
	display: block;
	padding-top: 30vh;
`;

const LoginButton = styled.button`
	background-color: white;
	color: ${DARK_BLUE};
	border-radius: 6px;
	padding: 15px;
	font-size: 20px;
	border: none;
	box-sizing: border-box;
	position: absolute;
	width: 80%;
	max-width: 250%;
	left: 10%;
	bottom: 5%;
	font-weight: bold;

	@media (min-width: 560px) {
		width: 250px;
		left: calc(50% - 125px);
	}

	margin: auto;
`
const Title = styled.h2`
	text-align: center;
	font-size: 24px;
	color: #FFFFFF;
`;

const LoginContainer = styled.div`
	display: block;
	width: 100%;
	height: 100vh;
	background-color: ${DARK_BLUE};
	margin: 0;
`

function NearLogin({login}) {
	return (
		<LoginContainer>
			<Logo src={fluxLogo} />
			<Title>markets reimagined</Title>
			<LoginButton onClick={login}> Login with <NearLogo src={nearLogo}/></LoginButton>
		</LoginContainer>
	)
}

export default NearLogin;
