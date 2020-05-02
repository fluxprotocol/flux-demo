import React from 'react';
import styled from 'styled-components';
import { Header, HeaderSection } from '../Market/MarketContent';
import FilledOrderButton from './FilledOrderButton';

export default ({orders, market}) => {
	const StyledHeader = styled(Header)`
		text-align: center;
		width: 25%;
	`;

let buttons = orders.map((order, i) => {
	let label = market.outcome_tags[order.outcome];
	if (market.outcomes === 2) {
		label = order.outcome === 0 ? "NO" : "YES";
	}
	return <FilledOrderButton label={label} order={order} key={i} />
})
	return (
		<>
			<HeaderSection>
				<StyledHeader>contract</StyledHeader>
				<StyledHeader>price per share</StyledHeader>
				<StyledHeader>order value</StyledHeader>
				<StyledHeader>shares</StyledHeader>
			</HeaderSection>
			{buttons}
		</>
	)
}

