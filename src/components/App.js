import React, { useEffect, useContext, useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Markets from './Markets';
import Loader from './Loader';
import { FluxContext, connect } from './FluxProvider';
import { API_URL } from '../constants';
import socketIOClient from "socket.io-client";
import { WebSocketContext } from './WSProvider';
import GAEvents from '../GAEvents';
import {getMarkets} from '../utils/marketsUtils';
import Header from './Header';
import Dashboard from './Dashboard';
import Market from './Market';
const ws = socketIOClient(API_URL);

function App({...props}) {
  const [{flux}, dispatch] = useContext(FluxContext);
  const [socket, dispatchSocket] = useContext(WebSocketContext);
  const [markets, setMarkets] = useState([]);

  const ga = new GAEvents();
  
  useEffect(() => {
    dispatchSocket({type: "webSocketConnected", payload: ws});
    connect().then( async fluxInstance => {
      if (fluxInstance.isSignedIn()) {
        ga.setAccountId(fluxInstance.getAccountId())
        ga.entryWithNearSession()
      } else {
        ga.entryNoNearSession()
      }
      dispatch({type: 'connected', payload: {flux: fluxInstance}});
      
      const res = await getMarkets([])
      const marketIds = res.markets.length > 0 ? res.markets.map(market => parseInt(market.marketId)) : [];

      fluxInstance.getMarketsById(marketIds).then(markets => {
        console.log(markets);
        setMarkets(fluxInstance.formatMarkets(markets));
      });

    })
  }, []);

  return (
    flux ?
    <Router>
      <Route path="/" component={() => <Header ga={ga}/>}/>
      <Route exact path="/" component={() => <Markets markets={markets}/>}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route path="/market/:marketId?" component={ 
        ({match}) => <Market single market={
          markets.find(market => market.id == match.params.marketId)}
        />}
      />
    </Router>
    :
    <Loader txLoading={true}/>
  );
}



export default App;
