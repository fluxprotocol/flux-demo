export const GOT_MARKETS = "GOT_MARKETS";
export const LOADING_MARKETS = "LOADING_MARKETS";

export const loadingMarkets = () => ({
	type: LOADING_MARKETS
})

export const gotMarkets = markets => ({
	type: GOT_MARKETS,
	payload: {
		markets
	}
});

export const getMarkets = contract => {
	return dispatch => {
		dispatch(loadingMarkets());
		let formattedMarkets = [];

		contract.get_all_markets()
		.then(json => {
			formattedMarkets = formatMarkets(json);
			dispatch(gotMarkets(formattedMarkets));
		})
		.catch (err => console.error(err));
	}
}

export const updateMarkets = contract => {
	return dispatch => {		
		return contract.get_all_markets()
		.then(json => {
			const formattedMarkets = formatMarkets(json);
			dispatch(gotMarkets(formattedMarkets));
		})
		.catch (err => console.error(err));

	}
}

function updateMarket(contract) {
	return new Promise((resolve, reject) => {
		let promArr = [];
		for (let i = 0; i < this.outcomes; i++) {
			promArr.push(contract.get_market_order({
				market_id: this.id,
				outcome: i,
			}));
		}
	
		Promise.all(promArr)
		.then(res => {
			res.forEach((order, i) => {
				if (this.orderbooks[i]) {
					this.orderbooks[i].market_order = order;
				}
			});

			resolve(this);
		})
		.catch(err => {
			console.error(err);
		});
	});	
}

function getUserOrders(contract, accountId) {
	return new Promise((resolve, reject) => {
		let userOrderProms = [];
		let methods = ["get_open_orders", "get_filled_orders"];
		for(let i = 0; i < methods.length; i++) {
			let outcomeProms = [];

			for (let j = 0; j < this.outcomes; j++) {
				outcomeProms.push(contract[methods[i]]({market_id: this.id, outcome: j, from: accountId}));
			}
			userOrderProms.push(Promise.all(outcomeProms));
		}
	
		Promise.all(userOrderProms).then(res=> resolve(res)).catch(reject);
		
	})
	
}


// TODO: filter out completed markets. Probably split UI up and only display completed markets that the user can claim funds in.
const formatMarkets = marketsObj => {
	const formattedMarkets = Object.keys(marketsObj).map(key => {
		let market = marketsObj[key];
		market.userOrders = {};
		market.updateMarket = updateMarket;
		market.getUserOrders = getUserOrders;

		return market;
	});

	formattedMarkets.sort((a, b) => b.liquidity - a.liquidity);

	return formattedMarkets
}