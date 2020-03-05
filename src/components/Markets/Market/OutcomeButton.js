import React from 'react';
import styled from 'styled-components';
import { DARK_BLUE, PINK, BLUE } from '../../../constants';
import { getOrderModal } from '../../../actions/marketActions';
import { connect } from 'react-redux';

export const Button = styled.button`
	width: 100%;
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
	@media (min-width: 560px) {
		padding: 15px 25px;
	}
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

const OutcomeButton = ({label, binary, index, market, dispatch, price, updateMarketOrders}) => {
	const color = binary ? index === 0 ? PINK : BLUE : DARK_BLUE;
	const lastTradedPrice = market.last_price_for_outcomes[index];
	const hasLastTradedPrice = !!lastTradedPrice;

	const ColoredButton = styled(Button)`
		border: 1px solid ${color};
	`
	return (

		<ColoredButton 
			onClick={() => dispatch(getOrderModal(market, index, price, updateMarketOrders))} 
		>
			<Label>{label}</Label>
			<LastTradedPrice>{hasLastTradedPrice ? lastTradedPrice + "¢" : "--"}</LastTradedPrice>
			<MarketPrice>{price < 100 ? price + "¢" : "--"}</MarketPrice>
		</ColoredButton>

	)
}
const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(null, mapDispatchToProps)(OutcomeButton);