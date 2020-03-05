import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './../OutcomeButton';
import { DARK_BLUE, PINK } from '../../../../constants';
import { daiToDollars } from '../../../../utils/unitConvertion';

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

const CancelText = styled.p`
	font-size: 20px;
	text-align: center;
	margin: 0;
	display: block;
	width: 100%;
	font-weight: bold;
`

export default ({order, label, selected, setSelected, cancelOrder}) => {
	const [canceled, setCanceled] = useState(false);

	const ColoredButton = styled(Button)`
		border: 1px solid ${selected ? PINK : DARK_BLUE};
		background-color: ${selected ? PINK : "white"};
		color: ${selected ? "white" : DARK_BLUE};
		margin: 10px 0 ;

	`;

	return (
		canceled ? null : (
			<ColoredButton onClick={() => {
				if (!selected) setSelected();
				else {
					setCanceled(true);
					cancelOrder();
				}
			}}>
				{selected ? <CancelText>cancel order</CancelText> : (
					<>
						<Label><BoldText>{label}</BoldText></Label>
						<ButtonData>{order.price_per_share}¢</ButtonData>
						<ButtonData><BoldText>${daiToDollars(order.spend)}</BoldText></ButtonData>
						<ButtonData>{(order.filled / order.spend * 100).toFixed(2)}%</ButtonData>
					</>
				)}
			</ColoredButton>
		)
	)
}