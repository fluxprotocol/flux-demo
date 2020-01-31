import React, {useState} from 'react';
import styled from 'styled-components';
import OrderViewSwitch from './OrderViewSwitch';
import Orderbook from './Orderbook';

//TODO: Text in constants
function OrderOverview({userOrders}) {
	const [orderView, setOrderView] = useState("OPEN");

	const toggleOrderView = () => {
		const newState = orderView === "OPEN" ? "FILLED" : "OPEN";
		setOrderView(newState)
	}

	return (
		<>
			<OrderViewSwitch toggle={toggleOrderView} activeView={orderView}/>
			<Orderbook userOrders={userOrders} orderType={orderView}/>
		</>
	);
}


export default OrderOverview;
