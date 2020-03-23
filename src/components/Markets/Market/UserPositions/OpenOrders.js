import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import { Header, HeaderSection } from '../MarketContent';
import CancelButton from './CancelButton';
import { FluxContext } from './../../../FluxProvider';

const OpenOrders = ({orders, market}) => {
	const [selectedOrder, setSelectedOrder] = useState(null)
	const [flux, dispatch] = useContext(FluxContext);
	const StyledHeader = styled(Header)`
		text-align: center;
		width: 25%;
	`

	const buttons = orders.map((order, i) => {
		const cancelOrder = () => flux.cancelOrder(market.id, order.outcome, order.id);
		let selected = i === selectedOrder;
		let label = market.outcome_tags[order.outcome];
		if (market.outcomes === 2) {
			label = order.outcome === 0 ? "NO" : "YES";
		}
		return <CancelButton label={label} cancelOrder={cancelOrder} setSelected={() => setSelectedOrder(i) } selected={selected} order={order} key={i} />
	});

	return (
		<>
			<HeaderSection>
				<StyledHeader>contract</StyledHeader>
				<StyledHeader>price per share</StyledHeader>
				<StyledHeader>order value</StyledHeader>
				<StyledHeader>% filled</StyledHeader>
			</HeaderSection>
			{buttons}
		</>
	)
}


export default OpenOrders