import BN from 'bn.js';
import { dollarsToDai } from '../utils/unitConvertion';
import { updateMarkets } from './marketsActions';
export const PLACED_ORDER = "PLACED_ORDER";
export const START_ORDER_PLACE = "START_ORDER_PLACE";
export const GET_ORDER_MODAL = "GET_ORDER_MODAL";
export const ORDER_CANCELED = "ORDER_CANCELED";

export const placedOrder = res => ({
	type: PLACED_ORDER,
	payload: {
		res
	}
})

export const startOrderPlace = (amountOfShares) => ({
	type: START_ORDER_PLACE,
	payload: {
		amountOfShares
	}
});

export const getOrderModal = (market, outcome, marketPrice, updateMarketOrders) => ({
	type: GET_ORDER_MODAL,
	payload: {
		market,
		outcome,
		marketPrice: marketPrice,
		updateMarketOrders
	}
});

export const orderCanceled = () => ({
	type: ORDER_CANCELED
});

export const placeOrder = (contract, account, marketId, outcome, price, spend, updateUserBalance, updateMarketOrders) => {
	return dispatch => {
		dispatch(startOrderPlace(spend / (price / 100)));
		spend = parseInt(dollarsToDai(spend));
		account.functionCall(
			window.nearConfig.contractName, 
			"place_order", 
			{
				market_id: marketId,
				outcome: outcome,
				spend,
				price_per_share: parseInt(price)
			},
			new BN("1000000000000000"),
			new BN("0")
		).then(res => {
			dispatch(placedOrder(true));
			dispatch(updateMarkets(contract));
			updateMarketOrders();
			updateUserBalance();
		}).catch(err => {
			dispatch(placedOrder(false));
			console.error(err);
		});
	}
}

export const cancelOrder = (account, marketId, outcome, orderId, updateUserBalance, updateMarketOrders) => {
	return dispatch => {
		account.functionCall(
			window.nearConfig.contractName, 
			"cancel_order", 
			{
				market_id: marketId,
				outcome,
				order_id: orderId,
			},
			new BN("1000000000000000"),
			new BN("0")
		).then(res => {
			dispatch(orderCanceled());
			updateUserBalance();
			updateMarketOrders();
		}).catch(err => {
			console.error(err);
		});
	}
}

export const claimEarnings = (account, marketId, updateUserBalance, updateClaimable) => {
	return dispatch => {
		dispatch(startOrderPlace(marketId));
		account.functionCall(
			window.nearConfig.contractName, 
			"claim_earnings", 
			{
				market_id: marketId
			},
			new BN("1000000000000000"),
			new BN("0")
		).then(() => {
			dispatch(placedOrder(true))
			updateUserBalance();
			updateClaimable();
		}).catch(()=> {
			dispatch(placedOrder(false))
		});
	}
}