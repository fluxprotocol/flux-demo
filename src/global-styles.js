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


	// TODO: Make sure all of these styles arent needed
	.blue .mdc-text-field .mdc-line-ripple {
		background-color: #5400FF!important;
	}
	.pink .mdc-text-field .mdc-line-ripple {
		background-color: #FF009C!important;
	}
	.mdc-text-field::before, .mdc-text-field::after {
		background-color: transparent!important;
	}
	.mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--textarea){
		background-color: transparent!important;
	}
	.mdc-text-field {
		background-color: transparent!important;
	}
	.mdc-text-field__input {
		font-size: 22px!important;
		font-weight: 400!important;
	}

	.material-input {
		width: 100%;
	}

	.blue .mdc-floating-label--float-above {
		color: #5400FF!important;
	}
	.pink .mdc-floating-label--float-above {
		color: #FF009C!important;
	}

	.market label {
		display: block;
		font-weight: 600;
	}

	.mdc-text-field:not(.mdc-text-field--disabled) {
		background-color: transparent;
	}

	.mdc-text-field:not(.mdc-text-field--enabled) {
		background-color: transparent;
	}
`

export default GlobalStyle;