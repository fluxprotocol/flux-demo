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
	
	const getAndSetMarkets = () => {
		flux.getAllMarkets().then(marketsObj => {
			const marketsArr = flux.formatMarkets(marketsObj).filter(market => market.end_time <= new Date().getTime() && market.finalized == false);
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

export default Governance;