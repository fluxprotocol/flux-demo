import React from 'react';
import styled from 'styled-components';
import { DARK_BLUE, PINK, BLUE } from '../../../constants';

const OutcomeButton = ({label, binary, index}) => {
	const color = binary ? index === 0 ? PINK : BLUE : DARK_BLUE;
	// const active = (marketOrder && orderType === "market") || (orderType === "limit") ? true : false;
	const Button = styled.button`
		width: 100%;
		border: 1px solid ${color};
		background-color: white;
		border-radius: 6px;
		padding: 10px 15px;
		margin: 5px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		-webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		-moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		color: ${DARK_BLUE};

		&:active {
			box-shadow: none;
			-webkit-box-shadow: none;
			-moz-box-shadow: none;
		}
	`;

	const Label = styled.span`
		font-size: 12px;
		width: 50%;
		font-weight: bold;
		text-align: left;
	`;
	const LastTradedPrice = styled.span`
		width: 25%;
		font-size: 20px;
		text-align: center;
	`;
	const MarketPrice = styled.span`
		text-align: right;
		width: 25%;
		font-size: 20px;
		font-weight: bold;
	`;

	return (

		<Button 
			// onClick={() =>  active && placeOrder(buyPrice) } 
			type="submit"
		>
			<Label>{label}</Label>
			<LastTradedPrice>71¢</LastTradedPrice>
			<MarketPrice>73¢</MarketPrice>
			{/* <span>{buyPrice}&#162;</span> */}
		</Button>

	)
}

export default OutcomeButton;