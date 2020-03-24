import React, { useContext, useState } from 'react';
import Modal from './../../Modal';
import OrderForm from './OrderForm';
import OrderRes from './OrderRes';
import OrderLoader from './OrderLoader';
import { OrderContext } from '../../OrderProvider';
import { FluxContext } from '../../FluxProvider';
import { dollarsToDai } from '../../../utils/unitConvertion';
import { WebSocketContext } from '../../WSProvider';

function OrderModal({ga}) {
	const [ socket, dispatchSocket ] = useContext(WebSocketContext);
	const [ orderContext, dispatchOrderContext ] = useContext(OrderContext);
	const [ {flux}, dispatchFlux ] = useContext(FluxContext);
	const [ loading, setLoading ] = useState(false);
	const [ orderRes, setOrderRes ] = useState(null);
	const [ amountOfShares, setAmountOfShares ] = useState(0);
	const market = orderContext.market;
	const signedIn = flux.isSignedIn();
	if (!signedIn) ga.placeOrderClickedNoSignin();
	
	const closeModal = () => {
		setOrderRes(null);
		dispatchOrderContext({type: 'stopOrderPlacement'})
	};

	const placeOrder = async (price, spend) => {
		const shares = spend / price * 100
		setAmountOfShares(shares);
		setLoading(true);

		try {
			const res = await flux.placeOrder(market.id, orderContext.outcome, dollarsToDai(spend), parseInt(price)).catch(err => console.error(err));
			socket.emit('order_placed', { marketId: market.id })
			const updatedBalance = await flux.getFDaiBalance().catch(err => console.error(err));
			dispatchFlux({type: "balanceUpdate", payload: {balance: updatedBalance}});
			setOrderRes({error: false, tx: res.transaction.hash});
		} catch (err){
			setOrderRes({error: true})
		}
		setLoading(false);
		
	};

	return (
		market && <Modal blackground={true} onBlackgroundClick={closeModal}>
			{
				!loading && orderRes !== null ?
				<OrderRes closeModal={closeModal} res={orderRes} amountOfShares={amountOfShares}/>
				:
				loading 
				?
				<OrderLoader amountOfShares={amountOfShares}/>
				:
				<OrderForm closeModal={closeModal} signedIn={signedIn} market={market} placeOrder={placeOrder} marketPrice={orderContext.price} outcome={orderContext.outcome} />
			}
		</Modal>
	);
}

export default OrderModal;