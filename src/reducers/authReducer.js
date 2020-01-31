import { GET_AUTH_STATUS_BEGIN, GET_AUTH_STATUS_SUCCESS, GET_AUTH_STATUS_FAILURE, SIGNED_IN, INVALID_ACCESS_TOKEN } from "../actions/authActions"

const initialState = {
	loading: false,
	success: null,
	error: null,
	signedIn: null,
	invalidAccessToken: null
}

export default function authReducer(state = initialState, action) {
	switch(action.type) {
		case INVALID_ACCESS_TOKEN:
			return {
				...state,
				invalidAccessToken: true,
				loading: false
			}
		case SIGNED_IN:
			return {
				...state,
				signedIn: action.payload.signedIn
			}
		case GET_AUTH_STATUS_BEGIN:
			return {
				...state,
				success: null,
				loading: true,
				error: null,
			}
		case GET_AUTH_STATUS_SUCCESS:
			return {
				...state,
				success: action.payload.allowed,
				loading: false,
				error: null,
				invalidAccessToken: !action.payload.allowed,
			}
		case GET_AUTH_STATUS_FAILURE:
			return {
				...state,
				success: false,
				loading: false,
				error: action.payload.err
			}
		default: 
			return state;
	}
}