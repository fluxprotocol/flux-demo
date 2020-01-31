import { createGlobalStyle } from 'styled-components';

import gilroyExtraBoldOtf from "./fonts/Gilroy-ExtraBold.otf";
import gilroyExtraBoldWoff from "./fonts/gilroy-extrabold-webfont.woff";
import gilroyExtraBoldWoff2 from "./fonts/gilroy-extrabold-webfont.woff2";

import latoOtf from "./fonts/Lato-Regular.ttf";
import latoWoff from "./fonts/lato-regular-webfont.woff";
import latoWoff2 from "./fonts/lato-regular-webfont.woff2";

import latoBoldOtf from "./fonts/Lato-Bold.ttf";
import latoBoldWoff from "./fonts/lato-bold-webfont.woff";
import latoBoldWoff2 from "./fonts/lato-bold-webfont.woff2";

const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'Gilroy';
		src: url('${gilroyExtraBoldOtf}') format('otf'),
			url('${gilroyExtraBoldWoff2}') format('woff2'),
			url('${gilroyExtraBoldWoff}') format('woff');
		font-weight: 600;
		line-height: 140%;
	  }
	  
  	@font-face {
		font-family: 'Lato';
		src: url('${latoWoff2}') format('woff2'),
			url('${latoWoff}') format('woff'),
			url('${latoOtf}')   format('truetype'); /* Safari, Android, iOS */
		line-height: 140%;
		font-size: 16px;
		color: #3B3B3B;
  	}
  	@font-face {
		font-family: 'Lato-bold';
		src: url('${latoBoldWoff2}') format('woff2'),
			url('${latoBoldWoff}') format('woff'),
			url('${latoBoldOtf}')   format('truetype'); /* Safari, Android, iOS */
		line-height: 140%;
		font-size: 16px;
		color: #3B3B3B;
  	}
	body h1, body h2, body h3, body h4 {
		font-family: 'Gilroy';
	} 
	
	body {
		margin: 0!important;
		font-family: 'Lato';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	html, body {
		background-color: #DFDFFE;
		/* overflow: hidden;
		display: block;
		position: fixed;
		height: 100%;
		width: 100%; */
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