import React, { useState } from 'react';
import styled from 'styled-components';
import { PINK, API_URL } from '../../constants';
import fluxLogo from '../../assets/flux-logo-white.png';
import { checkAccessToken } from '../../actions/authActions';
import { connect } from 'react-redux';
import isValidEmail from '../../utils/emailValidation';
import Recaptcha from 'react-google-invisible-recaptcha';

const Logo = styled.img`
	width: 80%;
	max-width: 250px;
	margin: auto;
	display: block;
	padding-top: 30vh;
`;


const SubmitButton = styled.button`
	background-color: ${PINK};
	color: white;
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
	bottom: 40px;

	@media (min-width: 560px) {
		width: 250px;
		left: calc(50% - 125px);
	}
`;

const Title = styled.h2`
	text-align: center;
	color: #310094;
`;

const Input = styled.input`
	width: calc(80% - 30px);
	left: 10%;
	position: absolute;
	bottom: 105px;
	border-radius: 6px;
	padding: 15px;
	border: none;

	@media (min-width: 560px) {
		width: 250px;
		left: calc(50% - 140px);
	}
`

const LoginContainer = styled.div`
`

const NoAccessTokenLink = styled.span`
	text-decoration: underline;
	font-size: 12px;
	color: rgba(0,0,0, 0.4);
	width: 100%;
	text-align: center;
	bottom: 15px;
	cursor: pointer;
	position: absolute;
`

const ErrorMessage = styled.p`
	color: red;
	text-align: center;
`

const SuccessMessage = styled.p`
	color: green;
	text-align: center;
`

function EnterAccessToken({dispatch, accountId, account}) {
	const [dataType, setDataType] = useState("token");
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	let recaptcha = null;

	const formSubmit = () => {
		if (dataType === "token") {
			dispatch(checkAccessToken(inputValue, accountId, null,  account))
		} else {
			if (isValidEmail(inputValue)) {
				recaptcha.execute()
			} else {
				recaptcha.reset();
				setError("Invalid email address")
			}
		}
	}

	const toggleDataType = () => {
		const newDataType =  dataType === "token" ? "email" : "token";
		setInputValue("");
		setDataType(newDataType)
	}

	const onRecaptchaResolved = ( recaptchaToken) => {
		fetch(`${API_URL}/add_user`, {
			method: "POST",
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				emailAddress: inputValue,
				newsletterOptIn: true,
				recaptchaToken
			})
		})
		.then(res => res.json())
		.catch((err) => {
			setError("Server error: please try again later.");
		})
		.then(json => {
			const { err } = json;
			recaptcha.reset();
			if (err) return setError("error: err");
			else return setSuccess("Your email was received, we'll get back to you with an access code asap");
		});
	}

	return (
		<LoginContainer>
			<Logo src={fluxLogo} />
			<Title>markets reimagined.</Title>
			<ErrorMessage>{error}</ErrorMessage>			
			<SuccessMessage>{success}</SuccessMessage>			
			<Input 
				placeholder={dataType === "token" ? "your-access-token" : "you@example.com"}
				type="text"
				value={inputValue}
				onChange={e => {
					setInputValue(e.target.value)
				}}
			/>
			<Recaptcha
				key={inputValue}
				ref={ ref => recaptcha = ref }
				sitekey={ "6LcT7L4UAAAAANjtaNvX-Lr2Xyz8_ZZZJbUMzYQX" }
				onResolved={recaptchaToken =>{ onRecaptchaResolved(recaptchaToken)} } 
			/>
			<NoAccessTokenLink onClick={toggleDataType}>{ dataType === "token" ? "I don't have an access token" : "I already have an access token"}</NoAccessTokenLink>
			<SubmitButton onClick={formSubmit}> Submit {dataType}</SubmitButton>
		</LoginContainer>
	)
}



export default connect()(EnterAccessToken);
