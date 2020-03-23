import React, { useContext } from 'react';
import styled from 'styled-components';
import BN from 'bn.js';
import { FluxContext } from '../FluxProvider';

const Market = styled.div`

`;

const OwnerPortalMarket = ({market}) => {
	const [flux, dispatch] = useContext(FluxContext);

	const deleteMarket = async () => {
		console.log("deleting...");
		await flux.deleteMarket(market.id);
	}
	
	const resolute = async (winningOutcome) => {
		console.log("resoluting...");
		try {
			await flux.resolute(market.id, winningOutcome);
			// TODO
			// updateMarkets()
		} 
		catch (err){
			console.error(err)
		}
	}

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


export default OwnerPortalMarket;