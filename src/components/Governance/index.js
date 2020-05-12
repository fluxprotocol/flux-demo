import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FluxContext } from '../FluxProvider';
import MarketGovernance from './MarketGovernance';
import { withRouter } from 'react-router-dom';

const GovernanceContainer = styled.div`
	padding: 0 5%; 
	padding-top: 150px;
`

function Governance({match}) {
	const [{flux}, ] = useContext(FluxContext);
	const [markets, setMarkets] = useState([]);
	const marketId = match.params.marketId;

	const getAndSetMarkets = () => {
		flux.getAllMarkets().then(marketsObj => {
			let marketsArr = flux.formatMarkets(marketsObj).filter(market => market.end_time <= new Date().getTime() && market.finalized == false);
			if (marketId !== undefined) {
				marketsArr = marketsArr.filter(market => market.id == marketId);
			}
			setMarkets(marketsArr)
		})
	}

	useEffect(() => {
		let unmounted = false; 
		//get and set markets
		
		if (!unmounted) getAndSetMarkets();
		return () => {
			unmounted = true
		}
	}, [])

	return (
		<GovernanceContainer>
			{markets.map((market, i) => <MarketGovernance getAndSetMarkets={getAndSetMarkets} key={i} data={market} />)}
		</GovernanceContainer>
	)
}

export default withRouter(Governance);