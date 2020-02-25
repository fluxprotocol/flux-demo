import React from 'react';
import styled from 'styled-components';

const MarketButton = ({theme, marketOrder, placeOrder, orderType, odds, label, earnings}) => {
	const active = (marketOrder && orderType === "market") || (orderType === "limit") ? true : false;
	const Button = styled.button`
		background-color: ${active ? theme : 'grey'};
		width: 100%;
		padding: 25px;
		border: none;
		color: white;
		font-family: 'Gilroy';
		font-size: 20px;
		border-radius: 6px;	
	`;

	const Earnings = styled.div`
		font-size: 18px;
		width: 100%;
		text-align: center;		
		margin-bottom: 5px;
		color: ${theme};
	`;

	const MarketButtonWrapper = styled.div`
		width: 47%;
	`
	let buyPrice;
	if (orderType === "market") {
		if (marketOrder) {
			buyPrice = 100 - marketOrder.price;
		}
		else {
			buyPrice = "-"
		}
	} else {
		buyPrice = odds;
	}

	return (
		<MarketButtonWrapper>
			<Earnings>Potential winnings: ${earnings}</Earnings>

			<Button 
				onClick={() =>  active && placeOrder(buyPrice) } 
				type="submit"
			>
				{`${label} @ `}
				<span>{buyPrice}&#162;</span>
			</Button>
		</MarketButtonWrapper>
	)
}

export default MarketButton;