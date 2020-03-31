export default data => {
	/* goal:
		 {
			 marketId: {
				 description: "description",
				 data: [
					 {date: exampleDate, outcome1: price, outcome2: price [...]},
					 {...}
				 ]
			 }
		 }
	*/

	const ordersMappedToMarkets = mapOrdersToMarkets(data);	
	const groupedByDateAndMerged = {};
	Object.keys(ordersMappedToMarkets).forEach(marketId => {
		const marketData = ordersMappedToMarkets[marketId];
		const orderData = ordersMappedToMarkets[marketId].data;
		const dates = [];
		groupedByDateAndMerged[marketId] = {description: marketData.description, data:[]};

		orderData.forEach(order => {
			const date = new Date(order.timestamp);
			const dateString = date.getDate() + "/" + parseInt(date.getMonth()) + 1 + "/" + date.getFullYear();
			if (!dates[dateString]) dates[dateString] = [];
			if (!dates[dateString][order.outcome]) dates[dateString][order.outcome] = [];
			dates[dateString][order.outcome].push(order.price_per_share)
		})

		Object.keys(dates).forEach(date => {
			const outcomeData = dates[date];
			const dataObj = {date}
			outcomeData.forEach((priceList, outcome) => {
				const avg = (priceList.reduce((sum, val) => sum + val) / priceList.length).toFixed(2);
				dataObj[outcome] = avg;
			})
			groupedByDateAndMerged[marketId].data.push(dataObj);
		});

	})

	return groupedByDateAndMerged;
	
}


function mapOrdersToMarkets(data) {
	const ordersMappedByMarket = {};

	data.ordersPlaced.forEach(order => {
		const marketId = order.args.market_id;
		if (!ordersMappedByMarket[marketId]) ordersMappedByMarket[marketId] = {}
		if (!ordersMappedByMarket[marketId]["data"]) ordersMappedByMarket[marketId]["data"] = []

		ordersMappedByMarket[marketId]["data"].push({
			...order.args,
			timestamp: order.timestamp
		})
	});

	
	data.marketsCreated.forEach(tx => {
		const marketId = tx.args.returned;
		const description = tx.args.description;
		if (ordersMappedByMarket[marketId]) ordersMappedByMarket[marketId].description = description;
	})
	return ordersMappedByMarket;
}