import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Market from '../Market';
import Spinner from '../Spinner';
import MarketFilter from './MarketFilter';
import { FluxContext } from '../FluxProvider';
import { DARK_BLUE } from '../../constants';


const MarketsContainer = styled.div`
  width: 100%;
  display: block;
  margin: 0 auto;
	margin-top: 80px;
	margin-bottom: 30px;

	@media (min-width: 560px) {
		margin-top: 115px;
	}
`
const Button = styled.button`
	display: inline-block;
	width: calc(20% - 30px);
	background: ${DARK_BLUE};
	color: white;
	font-size: 18px;
	border-style: outset;
	border-color: #0066A2;
	padding: 8px 15px;
	text-shadow:none;
	border-radius: 6px;
	margin-top: 15px;
`

const Markets = () => {
	const [markets, setMarkets] = useState(null)
	const [filteredMarkets, setFilteredMarkets] = useState(markets);
	const [{flux}] = useContext(FluxContext);

	useEffect(() => {
		flux.getAllMarkets().then(marketsObj => {
			const formattedMarkets = flux.formatMarkets(marketsObj);
			setMarkets(formattedMarkets);
		})
	},[])

	return (
		<MarketsContainer>
			{markets && <MarketFilter markets={markets} setMarkets={setFilteredMarkets} />}
			{
				filteredMarkets === null ? 
				<Spinner /> 
				:
				filteredMarkets.map((market) => (
					<Market market={market} key={market.id}/>
				))
			}	
		</MarketsContainer>
	);
}

export default Markets;
