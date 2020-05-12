import React from 'react';
import styled from 'styled-components';
import { DARK_BLUE, PINK, BLUE } from '../../constants';
import { Button, Label, LastTradedPrice, MarketPrice } from '../Market/OutcomeButton';


const OutcomeDummyButton = ({label, binary, index, price}) => {
	const color = binary ? index === 0 ? PINK : BLUE : DARK_BLUE;

	const ColoredButton = styled(Button)`
		border: 1px solid ${color};
	`
	return (

		<ColoredButton >
			<Label>{label}</Label>
			<LastTradedPrice>{"--"}</LastTradedPrice>
			<MarketPrice>{price < 100 ? price + "¢" : "--"}</MarketPrice>
		</ColoredButton>

	)
}

export default OutcomeDummyButton;