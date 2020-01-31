import React from 'react';
import styled from 'styled-components';
import fluxLogo from '../assets/flux-logo192.png';
import Spinner from './Spinner';

const SplashSpinner = styled(Spinner) `
	left: calc(50% - 32px);
	bottom: 15%;
`;

const SplashScreenContainer = styled.div`
	background-color: white;
	position: absolute;
	width: 100vw;
	height: 100vh;
	z-index: 100;
`;

const Logo = styled.img`
	width: 40%;
	max-width: 200px;
	margin: auto;
	display: block;
	margin-top: 30vh;
`;

const Title = styled.h2`
	text-align: center;
	color: #310094;
`;

function LoadingScreen() {
	return (
	  <SplashScreenContainer>
		  <Logo src={fluxLogo} alt="flux's logo"/>
		  <Title>markets reimagined.</Title>
		  <SplashSpinner />
	  </SplashScreenContainer>
	);

};

export default LoadingScreen;