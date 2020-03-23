import React, { useEffect, useContext, useState} from 'react';

import Header from './Header';
import Markets from './Markets/Markets';
import OwnerPortal from './OwnerPortal/OwnerPortal';
import OrderModal from './Markets/Market/OrderModal';
import Loader from './Loader';
import Flux from 'flux-sdk';
import { FluxContext } from './FluxProvider';
import { OrderProvider } from './OrderProvider';


const connect = async () => {
  const fluxInstance = new Flux();
  await fluxInstance.connect("flux_protocol_alpha");
  if (fluxInstance.walletConnection.isSignedIn()) {
    try {
      await fluxInstance.getFDaiBalance();
    } catch {
      await fluxInstance.claimFDai();
    }
  }
  return fluxInstance;
}

function App() {
  const [flux, dispatch] = useContext(FluxContext);
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    connect().then(fluxInstance => {
			dispatch({type: 'connected', payload: {fluxInstance}})
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
