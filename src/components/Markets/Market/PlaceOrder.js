import React, { useState } from 'react';
import styled from 'styled-components';

import ChangeablePrice from './ChangeablePrice';
import OrderInput from './OrderInput';
import { PINK, DARK_BLUE } from '../../../constants';
import Button from '../../ModalButton';

const CancelButton = styled.p`
	color: ${PINK};
	font-size: 18px;
	font-weight: lighter;
	text-decoration: underline;
	text-align: right;
`

const Row = styled.div`
	width: 100%;
	font-size: 18px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 6px;
	padding-top: 12px;
	border-bottom: 1px solid ${DARK_BLUE};
`
const Key = styled.p`
	margin: 0;
`
const Value = styled.span`
	font-weight: bold;
`

const PlaceOrder = ({market, outcome, closeModal, marketPrice, placeOrder}) => {
	const [price, setPrice] = useState(marketPrice);
	const [spend, setSpend] = useState(1);
	let label;
	if (market) {
		const outcomeTagExists = !!market.outcome_tags[outcome];
		label = outcomeTagExists ? market.outcome_tags[outcome] : outcome === 0 ? "NO" : "YES";
	}

	return (
		<>
			<CancelButton onClick={closeModal}>cancel</CancelButton>
			<Row>
				<Key>contract:</Key>
				<Value>{label}</Value>
			</Row>
			<Row>
				<Key>price per contract:</Key>
				<Value>
				<ChangeablePrice changePrice={setPrice} price={price} />
				</Value>
			</Row>
			<Row>
			<Key>total cost:</Key>
			<OrderInput value={spend} denomination={"$"} changeValue={setSpend}/>
			</Row>

			<Button onClick={() => placeOrder(price, spend)} color={DARK_BLUE}>BUY CONTRACT</Button>
		</>

	)
}

export default PlaceOrder;