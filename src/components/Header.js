import React from 'react';
import fluxLogo from '../assets/flux-logo.png';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signIn, signOut } from './../actions/accountActions';
import { daiToDollars } from '../utils/unitConvertion';

const Logo = styled.img`
	width: 15%;
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
	padding: 3% 5%;
	width: 90%;
	@media (min-width: 560px) {
		padding: 1% 5%;
	}
`

const LoginButton = styled.button`
	align-self: center;
	color: white;
	background-color: #FF009C;
	font-family: "Gilroy";
	border: none;
	border-radius: 6px;
	padding: 8px 15px;
	font-size: 18px;
`

const AccountInfoContainer = styled.div`
	width: 40%;
	font-family: "Lato-bold";
	line-height: 140%;
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
						<AccountInfoContainer>
							<AccountInfo> {accountId} </AccountInfo>
							<AccountInfo> {daiBalance ? `$${daiToDollars(daiBalance)}` : null}</AccountInfo>
						</AccountInfoContainer>
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
