import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { DARK_BLUE, PINK } from '../../constants';
import ResolutedSection from './ResolutedSection';
import MarketContent from './MarketContent.js';
import { FluxContext } from '../FluxProvider';
import { withRouter } from 'react-router-dom';

export const MarketContainer = styled.div`
  width: 90%;
  padding: 0 5%;
	margin-top: ${({single}) => single ? "105px" : "25px"};
	color: ${DARK_BLUE};
  display: block;
  background-color: white;
  border-radius: 8px;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  margin-left: 5%;

	@media (min-width: 560px) {
		overflow: auto;
		margin-bottom: 25px; 
	}

`;

function Market({market, match}) {
	let [marketData, setMarketData] = useState(market);
	const [{flux}, ] = useContext(FluxContext);

	useEffect(()=>{
		let unmounted = false;
		if (match.params.marketId != undefined) {
			flux.getMarketsById([parseInt(match.params.marketId)]).then(res => {
				const formattedMarket = flux.formatMarkets(res)
				if (!unmounted) setMarketData(formattedMarket[0])
			})
		}
		return () => {
			unmounted = true;
		}
	}, [])


	const hasEnded = market.end_time <= new Date().getTime();

	return (
		<MarketContainer single={match.params.marketId != undefined}>
			{
				marketData 
				?
					!hasEnded ? <MarketContent market={marketData}/> : <ResolutedSection market={marketData}/>
				:
				null
			}
		</MarketContainer>
	)
}

export default withRouter(Market);