import React from 'react';
import styled from 'styled-components';
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
				new BN("10000000000000000"),
				new BN("0")
			).then(() => {
				updateMarkets()
			})
		} 
		catch(err) {
			console.error(err);
		}
	}
	
	const resolute = async (winningOutcome) => {
		console.log("resoluting...");
		console.log({	
			market_id: market.id, 
			winning_outcome: winningOutcome
		})
		try {
			account.functionCall(
				window.nearConfig.contractName, 
				"resolute", 
				{ 
					market_id: market.id, 
					winning_outcome: winningOutcome
				},
				new BN("10000000000000000"),
				new BN("0")
			).then(() => {
				updateMarkets()
			})
		} 
		catch (err){
			console.error(err)
		}
	}

	// TODO: If outcomes === 2 create resolute no - yes buttons
	let resoluteButtons = [];
	if (market.outcomes === 2) {
		resoluteButtons = [<button key={0} onClick={() => resolute(0)}>resolute NO</button>, <button key={1} onClick={() => resolute(1)}>resolute YES</button>];
	} else {
		resoluteButtons = market.outcome_tags.map((outcomeTag, i) => (<button key={i} onClick={() => resolute(i)}>resolute {outcomeTag}</button>));
	
	}
	return (
		<Market>
			<p>{market.id}. {market.description}</p>
			{!market.resoluted ? 
			<>
				<p>Resolutable: { market.end_time < new Date().getTime() ? "true" : "false" } </p>
				{resoluteButtons}
				<button onClick={() => resolute(null)}>Resolute invalid</button>
			</>
		  : 
			<>
				<p>Resoluted: {market.outcome_tags[market.winning_outcome]} </p>
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