import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ModalButton from '../../../ModalButton';
import { DARK_BLUE, LIGHT_GRAY } from '../../../../constants';
import Loader from '../../../Loader';
import { filterUserOrders } from '../../../../utils/orderUtils';
import OpenOrders from './OpenOrders';
import FilledOrders from './FilledOrders';
import { Description } from './../MarketContent';
import ResolutionDate from '../ResolutionDate';

const Container = styled.div`
	background-color: white;
	animation: fadein 500ms linear;
	position: fixed;
	width: 90%;
	height: calc(100% - 70px);
	left: 0;
	top: 0;
	padding: 0 5%;
	padding-top: 71px;

	@keyframes fadein {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 100;
		}
	}
`

const OrderSection = styled.div`
	height: 67%;
	overflow: scroll;
`;

const Title = styled.p`
	font-weight: 500;
	font-size: 14px;
`;

const CancelButton = styled(ModalButton)`
	position: absolute;
	width: 90%!important;
	bottom: 3%;
`;

const UserPositions = ({closeModal, market, accountId, updateMarketOrders}) => {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		let cleaned = false;
		document.body.style.overflow = 'hidden';
		if (cleaned === false) setOrders(filterUserOrders(market, accountId));
		return () => {
			document.body.style.overflow = 'scroll';
			cleaned = true;
		};
	}, []);

	return (
		<Container>
			{	orders === null ? <Loader /> : (
				<>
					<ResolutionDate endTime={market.end_time} />
					<Description>{market.description}</Description>
					<OrderSection>
						<Title>my open orders</Title>
						<OpenOrders updateMarketOrders={updateMarketOrders} market={market} orders={orders.openOrders} />
						<Title>my filled orders</Title>
						<FilledOrders outcomeTags={market.outcome_tags} orders={orders.filledOrders}/>
					</OrderSection>
				</>
			)
		 }
		<CancelButton color={DARK_BLUE} onClick={closeModal}>{orders === null ? "Cancel" : "Done"}</CancelButton>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	accountId: state.account.accountId,
});

export default connect(mapStateToProps)(UserPositions);