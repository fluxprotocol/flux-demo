import React, { useEffect, useContext, useState} from 'react';

import Header from './Header';
import Markets from './Markets/Markets';
import OwnerPortal from './OwnerPortal/OwnerPortal';
import OrderModal from './Markets/Market/OrderModal';
import Loader from './Loader';
import { FluxContext, connect } from './FluxProvider';
import { OrderProvider } from './OrderProvider';
import { API_URL } from '../constants';
import socketIOClient from "socket.io-client";
import { WebSocketContext } from './WSProvider';

const ws = socketIOClient(API_URL);

function App() {
  const [{flux}, dispatch] = useContext(FluxContext);
  const [socket, dispatchSocket] = useContext(WebSocketContext);
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    dispatchSocket({type: "webSocketConnected", payload: ws});
    connect().then(fluxInstance => {
			dispatch({type: 'connected', payload: {flux: fluxInstance}})
      fluxInstance.getAllMarkets().then(res => {
        setMarkets(fluxInstance.formatMarkets(res));
      })
    })
  }, []);

  return (
    flux ?
    <>
      <OwnerPortal markets={markets}/>
      <Header/>
      <OrderProvider>
        <Markets markets={markets}/>
        <OrderModal/>
      </OrderProvider>
    </>
    :
    <Loader txLoading={true}/>
  );
}



export default App;
