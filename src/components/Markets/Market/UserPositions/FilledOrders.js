import React from 'react';
import styled from 'styled-components';
import { Header, HeaderSection } from '../MarketContent';
import FilledOrderButton from './FilledOrderButton';

export default ({orders, outcomeTags}) => {
	const StyledHeader = styled(Header)`
		text-align: center;
		width: 25%;
	`;

let buttons = orders.map((order, i) => {
	return <FilledOrderButton label={outcomeTags[order.outcome]} order={order} key={i} />
})
	return (
		<>
			<HeaderSection>
				<StyledHeader>contract</StyledHeader>
				<StyledHeader>price per share</StyledHeader>
				<StyledHeader>shares</StyledHeader>
			</HeaderSection>
			{buttons}
		</>
	)
}

