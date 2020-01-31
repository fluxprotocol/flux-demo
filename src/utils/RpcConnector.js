class RpcConnector {
	constructor(nodeUrl, connection) {
		this.nodeUrl = nodeUrl;
		this.connection = connection
		this.nonce = 0;
		this.status = null;
	}

	sendRpc = async (method, params) => {
		if (!this.status) this.status = await this.connection.provider.status();
		const request = JSON.stringify({
			method: "changes",
			block_hash: this.status.sync_info.latest_block_hash,
			params: [
				"all_access_key_changes",
				"flux-protocol-alpha",
				[]
			],
			id: 123,
			jsonrpc: "2.0"
		})

		console.log(this.nodeUrl, request);
		const res = await fetch(this.nodeUrl, {
			method: "POST",
			body: request,
			headers: { 'Content-type': 'application/json; charset=utf-8' }
		});

    if (!res.ok) {
			let text = await res.text()
			console.log(text);
			throw new Error(text);
		}	
		
		const json = await res.json();
		console.log(json)
	}
	
}

export default RpcConnector;