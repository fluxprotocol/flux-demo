import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FluxContext } from '../FluxProvider';
import MarketGovernance from './MarketGovernance';

const GovernanceContainer = styled.div`
	padding: 0 5%; 
	padding-top: 150px;
`

function Governance() {
	const [{flux}, ] = useContext(FluxContext);
	const [markets, setMarkets] = useState([]);
	useEffect(() => {
		let unmounted = false; 
		//get and set markets
		flux.getAllMarkets().then(marketsObj => {
			const marketsArr = flux.formatMarkets(marketsObj).filter(market => market.end_time <= new Date().getTime() && market.finalized == false);
			if (!unmounted) setMarkets(marketsArr)
		})

		return () => {
			unmounted = true
		}
	}, [])

	return (
		<GovernanceContainer>
			{markets.map((market, i) => <MarketGovernance key={i} data={market} />)}
		</GovernanceContainer>
	)
}

export default Governance;