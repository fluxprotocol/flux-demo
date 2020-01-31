import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { daiToDollars } from '../utils/unitConvertion';

const Book = styled.div`
`;

const Header = styled.div`
	margin-top: 2%;
	font-family: "Gilroy";
	display: flex;
	justify-content: space-between;
	width: 100%;
	font-family: "Gilroy";
`
const CollumnTitle = styled.div`
	text-align: center;
	width: 25%;
	margin: 0;
	padding: 0;
`;

const Body = styled.div`
	max-height: 100px;
	overflow: scroll;

	@media (min-width: 560px) {
		overflow: auto;
	}
	
`;
const Row = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	border-top: solid 1px rgba(0,0,0, 0.2);
	margin: 5px 0;
`;
const Entry = styled.div`
	text-align: center;
	width: 25%;
	margin: 0;
	padding: 0;
`;


function Orderbook({userOrders, orderType}) {	
	let key = 0;
	// TODO combine all orders that are bought at one specific price.
	if (userOrders === null) return (<></>);
	const orderIndex = orderType === "FILLED" ? 1 : 0;
	const orders = userOrders[orderIndex];

	let formattedOrderElems = [];

	orders.forEach((outcome, i) => {
		outcome.forEach(order => {
			formattedOrderElems.push(
				<Row key={key}>
					<Entry>{i === 0 ? "NO" : "YES"} </Entry>
					<Entry>{daiToDollars(order.amount * order.price)} </Entry>
					<Entry>{order.price}</Entry>
					<Entry>{parseInt(order.amount_filled) / parseInt(order.amount) * 100}%</Entry>
				</Row>
			)
			key++;
		});
	});

	return (
		<Book>
			<Header>
				<CollumnTitle>outcome</CollumnTitle>
				<CollumnTitle>spend</CollumnTitle>
				<CollumnTitle>price</CollumnTitle>
				<CollumnTitle>filled</CollumnTitle>
			</Header>
			<Body>
				{formattedOrderElems}
			</Body>
		</ Book>
	);
}

const mapStateToProps = state => ({
	accountId: state.account.accountId,
	contract: state.near.contract
})
export default connect(mapStateToProps)(Orderbook);
