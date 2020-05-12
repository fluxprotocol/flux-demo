import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Market/OutcomeButton';
import { DARK_BLUE, PINK } from '../../constants';
import { daiToDollars } from '../../utils/unitConvertion';
import StandardTXLoader, { DEFAULT_STATE } from '../StandardTxLoader';

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
	const [isLoading, setIsLoading] = useState(DEFAULT_STATE);

	const ColoredButton = styled(Button)`
		border: 1px solid ${selected ? PINK : DARK_BLUE};
		background-color: ${selected ? PINK : "white"};
		color: ${selected ? "white" : DARK_BLUE};
		margin: 10px 0 ;
	`;

	const handleCancel = async () => {
		if (!selected) return setSelected();
		setIsLoading({loading: true, res: null, err: null})
		await cancelOrder().catch(err => {
			setIsLoading({loading: false, res: "oops, something went wrong", err: true})
		})
		setCanceled(true);
		setIsLoading({loading: false, res: "success", err: true})
	}
	
	const closeLoader = () => setIsLoading({DEFAULT_STATE})

	return (
		canceled ? null : (
			<ColoredButton onClick={handleCancel}>
				{selected ? <CancelText>cancel order</CancelText> : (
					<>
						<Label><BoldText>{label}</BoldText></Label>
						<ButtonData>{order.price}¢</ButtonData>
						<ButtonData><BoldText>${daiToDollars(order.spend)}</BoldText></ButtonData>
						<ButtonData>{(order.filled / order.spend * 100).toFixed(2)}%</ButtonData>
					</>
				)}
			{(isLoading.loading || isLoading.res) && <StandardTXLoader res={isLoading.res} err={isLoading.err} closeLoader={closeLoader} />}
			</ColoredButton>
		)
	)
}