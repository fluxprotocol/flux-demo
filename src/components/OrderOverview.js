import React, {useState} from 'react';
import OrderViewSwitch from './OrderViewSwitch';
import Orderbook from './Orderbook';
import styled from 'styled-components';

const Description = styled.h1`
	font-size: 20px;
	color: #310094;
	display: block;
	margin: 0 auto;
	padding-top: 15px;
	text-align: center;
`
//TODO: Text in constants
function OrderOverview({userOrders}) {
	const [orderView, setOrderView] = useState("OPEN");

	const toggleOrderView = () => {
		const newState = orderView === "OPEN" ? "FILLED" : "OPEN";
		setOrderView(newState)
	}

	return (
		<>
			<Description>Your orders</Description>
			<OrderViewSwitch toggle={toggleOrderView} activeView={orderView}/>
			<Orderbook userOrders={userOrders} orderType={orderView}/>
		</>
	);
}


export default OrderOverview;
