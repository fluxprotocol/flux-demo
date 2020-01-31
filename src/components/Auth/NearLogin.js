import React from 'react';
import styled from 'styled-components';
import { PINK } from '../../constants';
import fluxLogo from '../../assets/flux-logo192.png';
import nearLogo from '../../assets/near-logo-white.svg';

const NearLogo = styled.img`
	height: 16px;
	position: inline;
	vertical-align: middle;
	margin-left: 5px;
`

const Logo = styled.img`
	width: 35%;
	max-width: 200px;
	margin: auto;
	display: block;
	margin-top: 30vh;
`;
const LoginButton = styled.button`
	background-color: ${PINK};
	color: white;
	font-family: "Gilroy";
	border-radius: 6px;
	padding: 15px;
	font-size: 16px;
	border: none;
	box-sizing: border-box;
  -webkit-box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  -moz-box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
	position: absolute;
	width: 80%;
	left: 10%;
	bottom: 25px;

	@media (min-width: 560px) {
		width: 250px;
		left: calc(50% - 125px);
	}

	margin: auto;
`
const Title = styled.h2`
	text-align: center;
	color: #310094;
`;

const LoginContainer = styled.div`
`

function NearLogin({login}) {
	return (
		<LoginContainer>
			<Logo src={fluxLogo} />
			<Title>markets reimagined.</Title>
			<LoginButton onClick={login}> Login with <NearLogo src={nearLogo}/></LoginButton>
		</LoginContainer>
	)
}

export default NearLogin;
