import ReactGA from 'react-ga';
import { TRACKING_ID } from './constants';

export default class GAEvents {
	constructor() {
		ReactGA.initialize(TRACKING_ID);
	}

	setAccountId = (accountId) => {
		ReactGA.set({
			userId: accountId
		})
	}
	
	entryWithNearSession = () => ReactGA.event({
		category: "Authentication",
		action: "User entered the app"
	});
	entryNoNearSession = () => ReactGA.event({
		category: "Authentication",
		action: "User without near account entered the application"
	});
	
	signInClicked = () => ReactGA.event({
		category: "Onboarding",
		action: "User clicked the near sign in button"
	})
	signOutClicked =  () => ReactGA.event({
		category: "Onboarding",
		action: "User clicked the near sign out button"
	})

	placeOrderClickedNoSignin = () => ReactGA.event({
		category: "Actions",
		action: "User clicked place order without being signed in"
	});
}


