import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import GlobalStyles from  "./global-styles";
import App from './components/App';
import { FluxProvider } from './components/FluxProvider';
import { WSProvider } from './components/WSProvider';

const FluxApp = () => (
	<FluxProvider>
		<WSProvider>
			<App/>
		</WSProvider>
	</FluxProvider>
)

ReactDOM.render(
	<>
		<GlobalStyles/>
		<Router>
			<Route exact path="/" component={FluxApp}/>
		</Router>
	</>
	, 
	document.getElementById('root')
);

serviceWorker.unregister();