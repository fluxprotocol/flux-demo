import React, { useEffect, useContext, useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Markets from './Markets';
import Loader from './Loader';
import { FluxContext, connect } from './FluxProvider';
import { API_URL } from '../constants';
import socketIOClient from "socket.io-client";
import { WebSocketContext } from './WSProvider';
import GAEvents from '../GAEvents';
import Header from './Header';
import Market from './Market';
import MarketCreation from './MarketCreation.js';
const ws = socketIOClient(API_URL);

function App({...props}) {
  const [{flux}, dispatch] = useContext(FluxContext);
  const [, dispatchSocket] = useContext(WebSocketContext);

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
    })
  }, []);

  return (
    flux ?
    <Router>
      <Route path="/" component={() => <Header ga={ga}/>}/>
      <Route exact path="/" component={Markets}/>
      <Route path="/create" component={MarketCreation}/>
      <Route path="/market/:marketId?" component={Market}/>
    </Router>
    :
    <Loader txLoading={true}/>
  );
}



export default App;
