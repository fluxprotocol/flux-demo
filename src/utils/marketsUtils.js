import { API_URL } from "../constants";

export const addMarket = async (marketId, description, accountId ,categories, signedMessage) => {
	if (typeof marketId !== "number") throw new Error("Invalid marketId type");
	return fetch(`${API_URL}/markets/add`, {
		method: "POST",
		mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			marketId,
			description,
			accountId,
			categories,
			publicKey: signedMessage.publicKey.toString(),
			signature: Buffer.from(signedMessage.signature, "base64"),
		})
	})
}


export const getMarketIds = async (categories) => {
	if (categories.length === undefined) throw new Error("categories need to be an array, pass an empty array if no category filters")
	const res = await fetch(`${API_URL}/markets/get`, {
		method: "POST",
		mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			categories,
		})
	})

	return await res.json();
}

export const removeMarket = async (marketId, accountId, signedMessage ) => {
	const res = await fetch(`${API_URL}/markets/remove`, {
		method: "POST",
		mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			marketId,
			accountId,
			publicKey: signedMessage.publicKey.toString(),
			signature: Buffer.from(signedMessage.signature, "base64"),		})
	});
	return await res.json();
}
