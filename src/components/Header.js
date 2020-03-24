import React, { useEffect, useState, useContext } from 'react';
import fluxLogo from '../assets/flux-logo.png';
import styled from 'styled-components';
import { daiToDollars } from '../utils/unitConvertion';
import { DARK_GRAY, WHITE, DARK_BLUE } from '../constants';
import { FluxContext } from './FluxProvider';

const Logo = styled.img`
	width: 12%;
	display: inline-block;
	align-self: center;
	@media (min-width: 560px) {
		max-width: 55px;	
	}
`

const HeaderContainer = styled.header`
	display: flex;
	position: fixed;
	z-index: 99;
	background-color: white;
	justify-content: space-between;
	vertical-align: middle;
	align-items: center;
	padding: 2% 5%;
	font-weight: bold;
	top: 0;
	max-height: 70px;
	width: 90%;
	border-bottom: 1px solid ${DARK_GRAY};
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
	font-size: 12px;

	@media (min-width: 560px) {
		padding: 1% 5%;
	}
`

const LoginButton = styled.button`
	align-self: center;
	color: ${DARK_BLUE};
	background-color: ${WHITE};
	border: 1px solid ${DARK_BLUE};
	border-radius: 6px;
	padding: 8px 12px;
	font-weight: bold;

	font-size: 10px;
`
const AccountInfo = styled.span`
	display: block;
	position: relative;
	text-align: center;
`

/* TODO: Finish allowance warning */
const AllowanceWarning = styled.div`
	display: none; 
	color: red;
	border: 1px solid red;
	border-radius: 50%;
	position: absolute;
	width: 12px;
	font-size: 10px;
	right: -18px;
	top: 1px;

`

function Header({ga}) {
	const [{flux, balance}, dispatch] = useContext(FluxContext);
	const isSignedIn = flux.walletConnection.isSignedIn();
	
	const reloadApp = () => {
		window.location.reload();
	}

	if ((balance === null || balance === undefined) && flux.isSignedIn()) {

		flux.getFDaiBalance(flux.getAccountId).then(updatedBalance => 
			dispatch({type: "balanceUpdate", payload: {balance: updatedBalance}})
		).catch(err => console.error(err))
	}
	
	return (
		<HeaderContainer>
		  <Logo onClick={reloadApp} id="header-logo" src={fluxLogo} alt="our company logo"/>
		  {
				!isSignedIn
				? 
			  <LoginButton onClick={() => {
					ga.signInClicked();
					flux.signIn()
				}} >Login</LoginButton>
				: (
					<>
						<AccountInfo> {flux.getAccountId()} <AllowanceWarning>!</AllowanceWarning> </AccountInfo>
						<AccountInfo> {balance !== undefined ? `$${daiToDollars(balance)}` : null}</AccountInfo>
						<LoginButton onClick={() => {
							ga.signOutClicked();
							flux.signOut()
							reloadApp()
						}}>Logout</LoginButton>
					</>
				)
		  }
		</HeaderContainer>
	);

}

export default Header;
