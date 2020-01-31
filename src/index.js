import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import GlobalStyles from  "./global-styles";

import Authenticate from './components/Auth/Authenticate';
import rootReducer from './reducers/rootReducer';

const store = createStore(
	rootReducer, 
	applyMiddleware(thunk)
);

ReactDOM.render(
	<Provider store={store}>
		<GlobalStyles/>
		<Router>
			<Route exact path="/:accessToken?" component={Authenticate}/>
		</Router>
	</Provider>
	, document.getElementById('root')
);

serviceWorker.unregister();