import { createGlobalStyle } from 'styled-components';
import { DARK_BLUE } from './constants';

const GlobalStyle = createGlobalStyle`
	
	body {
		margin: 0!important;
		font-family: "Roboto", sans-serif;
		color: ${DARK_BLUE};
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
`

export default GlobalStyle;