import { Wampy } from 'wampy'
import { providers, Account } from 'nearlib';
import { NEAR_RPC_URL } from '../../constants';
const WAMP_NEAR_EXPLORER_URL = 'wss://near-explorer-wamp.onrender.com/ws'
const WAMP_NEAR_EXPLORER_TOPIC_PREFIX = 'com.nearprotocol.testnet.explorer'

const wamp = new Wampy(WAMP_NEAR_EXPLORER_URL, { realm: 'near-explorer' })

async function getFunctionCallArgs(txHash, accountId) {
    const res = await fetch(`https://rpc.nearprotocol.com`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
            method: 'tx',
            params: [txHash, accountId],
            id: 'dontcare',
            jsonrpc: '2.0'
        }),
    })

    const json = await res.json();
    return {returned: json.result.status.SuccessValue !== undefined ? atob(json.result.status.SuccessValue) : false,...JSON.parse(atob(json.result.transaction.actions[0].FunctionCall.args))}
}

async function callWamp(procedure, args) {
    return new Promise((resolve, reject) => wamp.call(
        `${WAMP_NEAR_EXPLORER_TOPIC_PREFIX}.${procedure}`,
        args,
        {
            onSuccess(dataArr) {
                resolve(dataArr[0])
            },
            onError(err) {
                reject(err);
            }
        }
    ));
}

export async function getTransactions(accountId = '') {
    const tx = await callWamp(
        `select`,
        [
            `
                SELECT 
                    transactions.hash,
                    transactions.signer_id as signerId,
                    blocks.timestamp as timestamp,
                    actions.action_type as type,
                    actions.action_args as action_args
                FROM
                    transactions
                LEFT JOIN blocks ON blocks.hash = transactions.block_hash
                LEFT JOIN actions ON actions.transaction_hash = transactions.hash
                WHERE
                    receiver_id = :accountId
                ORDER BY blocks.height ASC
            `,
            {accountId}
        ],
    );
    const allPlaceOrders = tx.filter(t => t.type === "FunctionCall" && JSON.parse(t.action_args).method_name === "place_order");
    const placeOrderArgProms = allPlaceOrders.map(transaction => getFunctionCallArgs(transaction.hash, transaction.signerId));
    const placeOrderArgs = await Promise.all(placeOrderArgProms);
    const placeOrderTxWithArgs = allPlaceOrders.map((t, i) => ({args: placeOrderArgs[i], ...t}))
    const validTx = placeOrderTxWithArgs.filter(tx => tx.args.returned === "")
    
    const allMarketCreations = tx.filter(t => t.type === "FunctionCall" && JSON.parse(t.action_args).method_name === "create_market");
    const marketCreationArgProms = allMarketCreations.map(transaction => getFunctionCallArgs(transaction.hash, transaction.signerId));
    const marketCreationArgs = await Promise.all(marketCreationArgProms);
    const createdMarketTxWithArgs = allMarketCreations.map((t, i) => ({args: marketCreationArgs[i], ...t}))
    const validMarketTx = createdMarketTxWithArgs.filter(tx => tx.args.returned)
    return {
        ordersPlaced: validTx,
        marketsCreated: validMarketTx
    };
}




