import React from 'react';
import fluxLogo from '../assets/flux-logo.svg';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signIn, signOut } from './../actions/accountActions';
import { daiToDollars } from '../utils/unitConvertion';
import { DARK_GRAY, WHITE, DARK_BLUE } from '../constants';

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
	justify-content: space-between;
	vertical-align: middle;
	align-items: center;
	padding: 2% 5%;
	font-weight: bold;
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
	text-align: center;
`

function Header({allowance, daiBalance, walletAccount, accountId, isSignedIn}) {
	return (
		<HeaderContainer>
		  <Logo id="header-logo" src={fluxLogo} alt="our company logo"/>
		  {
				!isSignedIn
				? 
			  <LoginButton onClick={() => signIn(walletAccount)} >Login</LoginButton>
				: (
					<>
						<AccountInfo> {accountId} </AccountInfo>
						<AccountInfo> {daiBalance ? `$${daiToDollars(daiBalance)}` : null}</AccountInfo>
						<LoginButton onClick={() => signOut(walletAccount)}>Logout</LoginButton>
					</>
				)
		  }
		</HeaderContainer>
	);

}

const mapStateToProps = (state) => ({
	near: state.near.near,
	daiBalance: state.near.daiBalance,
	walletAccount: state.near.walletAccount,
	account: state.account.account,
	accountId: state.account.accountId,
	allowance: state.account.allowance,
	accountState: state.account.accountState,
	isSignedIn: state.account.isSignedIn
});

export default connect(mapStateToProps)(Header);
