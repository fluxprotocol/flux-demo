import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import GlobalStyles from  "./global-styles";
import App from './components/App';
import { FluxProvider } from './components/FluxProvider';
import { WSProvider } from './components/WSProvider';

ReactDOM.render(
	<>
		<GlobalStyles/>
		<FluxProvider>
			<WSProvider>
				<App/>
			</WSProvider>
		</FluxProvider>
	</>
	, 
	document.getElementById('root')
);

serviceWorker.unregister();