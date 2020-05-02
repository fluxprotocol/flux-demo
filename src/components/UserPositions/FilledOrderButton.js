import React from 'react';
import styled from 'styled-components';
import { Button } from '../Market/OutcomeButton';
import { DARK_BLUE } from '../../constants';
import { daiToDollars } from '../../utils/unitConvertion';

const ButtonData = styled.span`
	width: 25%;
	text-align: center;
	font-size: 20px;
`
const Label = styled.span`
	width: 25%;
	text-align: center;
	font-size: 12px;
	font-weight: bold;

`

const BoldText = styled.span`
	font-weight: bold;
`;

export default ({order, label}) => {
	const ColoredButton = styled(Button)`
		border: 1px solid ${DARK_BLUE};
		margin: 10px 0 ;
	`;

	return (
		<ColoredButton>
			<Label>{label}</Label>
			<ButtonData>{order.price}¢</ButtonData>
			<ButtonData><BoldText>${daiToDollars(order.spend)}</BoldText></ButtonData>
			<ButtonData>{daiToDollars(order.sharesFilled * 100)}</ButtonData>
		</ColoredButton>
	)
}