import React, { useContext, useState } from 'react';
import Modal from './../../Modal';
import OrderForm from './OrderForm';
import OrderRes from './OrderRes';
import OrderLoader from './OrderLoader';
import { OrderContext } from '../../OrderProvider';
import { FluxContext } from '../../FluxProvider';
import { dollarsToDai, daiToDollars } from '../../../utils/unitConvertion';

function OrderModal() {
	const [ orderContext, dispatch ] = useContext(OrderContext);
	const [ flux, dispatchFlux ] = useContext(FluxContext);
	const [ loading, setLoading ] = useState(false);
	const [ orderRes, setOrderRes ] = useState(null);
	const [ amountOfShares, setAmountOfShares ] = useState(0);

	const closeModal = () => {
		setOrderRes(null);
		dispatch({type: 'stopOrderPlacement'})
	};

	const placeOrder = async (price, spend) => {
		// const emitUpdateMarket = () => { 
		// 	socket.emit('order_placed', { marketId: market.id })
		// };

		const shares = spend / price * 100
		setAmountOfShares(shares);
		setLoading(true);
		let res;
		try {
			res = await flux.placeOrder(orderContext.market.id, orderContext.outcome, parseInt(dollarsToDai(spend)), price);
			setOrderRes({err: false, tx: res.transaction.hash});
		} catch {
			setOrderRes({err: true, tx: res.transaction.hash})
		}
		setLoading(false);
		
	};

	return (
		orderContext.market && <Modal blackground={true} onBlackgroundClick={closeModal}>
			{
				!loading && orderRes !== null ?
				<OrderRes closeModal={closeModal} res={orderRes} amountOfShares={amountOfShares}/>
				:
				loading 
				?
				<OrderLoader amountOfShares={amountOfShares}/>
				:
				<OrderForm closeModal={closeModal} market={orderContext.market} placeOrder={placeOrder} marketPrice={orderContext.price} outcome={orderContext.outcome} />
			}
		</Modal>
	);
}

export default OrderModal;