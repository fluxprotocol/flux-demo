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
import GAEvents from '../GAEvents';

const ws = socketIOClient(API_URL);

function App() {
  const [{flux}, dispatch] = useContext(FluxContext);
  const [socket, dispatchSocket] = useContext(WebSocketContext);
  const [markets, setMarkets] = useState([]);
  const ga = new GAEvents();

  useEffect(() => {
    dispatchSocket({type: "webSocketConnected", payload: ws});
    connect().then(fluxInstance => {
      if (fluxInstance.isSignedIn()) {
        ga.setAccountId(fluxInstance.getAccountId())
        ga.entryWithNearSession()
      } else {
        ga.entryNoNearSession()
      }
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
      <Header ga={ga}/>
      <OrderProvider>
        <Markets markets={markets}/>
        <OrderModal ga={ga}/>
      </OrderProvider>
    </>
    :
    <Loader txLoading={true}/>
  );
}



export default App;
