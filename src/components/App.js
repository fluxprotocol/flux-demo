import React, { useEffect, useContext, useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Markets from './Markets';
import Loader from './Loader';
import { FluxContext, connect } from './FluxProvider';
import Header from './Header';
import Market from './Market';
import MarketCreation from './MarketCreation.js';
import Governance from './Governance';

function App({...props}) {
  const [{flux}, dispatch] = useContext(FluxContext);
  
  useEffect(() => {
    connect().then( async fluxInstance => {
      dispatch({type: 'connected', payload: {flux: fluxInstance}});
    })
  }, []);

  return (
    flux ?
    <Router>
      <Route path="/" component={() => <Header />}/>
      <Route exact path="/" component={Markets}/>
      <Route path="/create" component={MarketCreation}/>
      <Route path="/govern" component={Governance}/>
      <Route path="/market/:marketId?" component={Market}/>
    </Router>
    :
    <Loader txLoading={true}/>
  );
}



export default App;
