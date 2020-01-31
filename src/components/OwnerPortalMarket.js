import React from 'react';
import styled from 'styled-components';
import { YES_WINS_PAYOUT, NO_WINS_PAYOUT, INVALID_MARKET_PAYOUT } from '../constants';
import { fromPayoutDistribution } from '../utils/unitConvertion';
import { connect } from 'react-redux';
import BN from 'bn.js';
const Market = styled.div`

`;

const OwnerPortalMarket = ({ account, market, contract, updateMarkets, dispatch }) => {
	const deleteMarket = async () => {
		console.log("deleting...");
		try {
			account.functionCall(
				window.nearConfig.contractName, 
				"delete_market", 
				{
					market_id: market.id,
				},
				new BN("100000000000000"),
				new BN("0")
			).then(() => {
				updateMarkets()
			})
		} 
		catch(err) {
			console.error(err);
		}
	}
	
	const resolute = async (payoutDistribution) => {
		let invalid = payoutDistribution[0] === 5000 ? true : false;
		console.log("resoluting...");
		console.log({	market_id: market.id, 
			payout: payoutDistribution, 
			invalid})
		try {
			account.functionCall(
				window.nearConfig.contractName, 
				"resolute", 
				{ 
					market_id: market.id, 
					payout: payoutDistribution, 
					invalid
				},
				new BN("100000000000000"),
				new BN("0")
			).then(() => {
				updateMarkets()
			})
		} 
		catch (err){
			console.error(err)
		}
	}

	return (
		<Market>
			<p>{market.id}. {market.description}</p>
			{!market.resoluted ? 
			<>
				<p>Resolutable: { market.end_time < new Date().getTime() ? "true" : "false" } </p>
				<button onClick={() => resolute(YES_WINS_PAYOUT)}>Resolute yes</button>
				<button onClick={() => resolute(NO_WINS_PAYOUT)}>Resolute no</button>
				<button onClick={() => resolute(INVALID_MARKET_PAYOUT)}>Resolute invalid</button>
			</>
		  : 
			<>
				<p>Resoluted: {fromPayoutDistribution(market.payout_multipliers)} </p>
			</>	
			}
			
			<button onClick={deleteMarket}> Delete</button>
		</Market>
	);
};

const mapStateToProps = (state) => ({
	contract: state.near.contract,
	account: state.account.account,
})

export default connect(mapStateToProps)(OwnerPortalMarket);