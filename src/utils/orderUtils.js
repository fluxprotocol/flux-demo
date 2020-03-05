export const filterUserOrders = (market, accountId) => {
	const orderObj = {
		openOrders: [],
		filledOrders: []
	}
	
	for (const outcome in market.orderbooks) {
		const orderbook = market.orderbooks[outcome];

		for (const orderId in orderbook.filled_orders) {
			const order = orderbook.filled_orders[orderId];
			if (order.creator === accountId) orderObj.filledOrders.push(order);
		}

		for (const orderId in orderbook.open_orders) {
			const order = orderbook.open_orders[orderId];
			if (order.creator === accountId) orderObj.openOrders.push(order);
		}
	}

	return orderObj;
}