import ReactGA from 'react-ga';
import { TRACKING_ID } from './constants';

ReactGA.initialize(TRACKING_ID);

export const setAccountId = (accountId) => {
	ReactGA.set({
		userId: accountId
	})
}

export const AUTH = {
	START: () => ReactGA.event({
		category: "Authentication",
		action: "User started authentication process"
	}),
	SIGN_IN_UNAUTHENTICATED: () => ReactGA.event({
		category: "Authentication",
		action: "Unauthenticated user signin"
	}),
	SIGN_IN: () => ReactGA.event({
		category: "Authentication",
		action: "User signedin"
	})

}
export const ONBOARDING = {
	NEAR_LOGIN_CLICK: () => ReactGA.event({
		category: "Onboarding",
		action: "User clicked NEAR signin"
	}),

}