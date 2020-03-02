import React, { useState } from 'react';
import Modal from './../../Modal';
import { connect } from 'react-redux';
import { getOrderModal, placeOrder } from '../../../actions/marketActions';
import PlaceOrder from './PlaceOrder';
import { updateBalance } from '../../../actions/nearActions';
import OrderRes from './OrderRes';
import OrderLoader from './OrderLoader';

function OrderModal({market, outcome, marketPrice, dispatch, account, accountId, contract, loading, amountOfShares, orderRes}) {
	const closeModal = () => dispatch(getOrderModal(null, null, null));
	const callUpdateBalance = () => dispatch(updateBalance(contract, accountId));
	const dispatchPlaceOrder = (price, spend) => {
		dispatch(placeOrder(account, market.id, outcome, price, spend, callUpdateBalance))
	};
	console.log( "actual amount of shares", amountOfShares);
	return (
		 
	 	market && (
		 	<Modal blackground={true} onBlackgroundClick={loading ? () => {} : closeModal}>
				{
					!loading && orderRes !== null ?
					<OrderRes closeModal={closeModal} res={orderRes} amountOfShares={amountOfShares}/>
					:
					loading 
					?
					<OrderLoader amountOfShares={amountOfShares}/>
					:
					<PlaceOrder closeModal={closeModal} market={market} placeOrder={dispatchPlaceOrder} marketPrice={marketPrice} outcome={outcome} />
				}
			</Modal>
		)
	);

}


const mapStateToProps = (state) => ({
	market: state.market.selectedMarket,
	outcome: state.market.selectedOutcome,
	loading: state.market.loading,
	orderRes: state.market.res,
	amountOfShares: state.market.amountOfShares,
	marketPrice: state.market.marketPrice,
	account: state.account.account,
	accountId: state.account.accountId,
	contract: state.near.contract,
});
export default connect(mapStateToProps)(OrderModal);
