import React, { useState } from 'react';
import styled from 'styled-components';
import OrderInput from './OrderInput';

let StaticPrice = styled.span`
	margin: 0 5px;
	font-size: 18px;
	vertical-align: middle;

`;

let ChangeButton = styled.span`
	font-size: 12px;
	text-decoration: underline;
	font-weight: 400;
`

export default function ChangeablePrice({price, changePrice}) {
	let [marketOrder, setMarketOrder] = useState(true);

	if (price === 100) {
		price = 50;
		changePrice(50);
	}

	return (
		marketOrder && price !== 100 ? (
			<div onClick={() => setMarketOrder(false)}>
				<StaticPrice>{price}¢</StaticPrice>
				<ChangeButton >change</ChangeButton>
			</div>
		) : (
			<OrderInput value={price} denomination={"¢"} focus={true} changeValue={changePrice} />
		)
	)
};