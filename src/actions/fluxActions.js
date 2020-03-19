import Flux from 'flux-sdk';
export const CONNECTED = "CONNECTED";
export const CONNECTING = "CONNECTING";

const flux = new Flux();

export const connected = flux => ({
	type: CONNECTED,
	payload: {
		flux
	}
});
export const connecting = flux => ({
	type: CONNECTING
});

export const connectFlux = () => {
	return async dispatch => {
		dispatch(connecting());
		await flux.connect("flux_protocol_alpha");
		dispatch(connected(flux));
	}
}