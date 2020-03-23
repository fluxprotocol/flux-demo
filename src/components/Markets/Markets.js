import React, { useContext } from 'react';
import styled from 'styled-components';
import Market from './Market/Market';
import Spinner from '../Spinner';

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

const Markets = ({markets}) => {
	return (
		<MarketsContainer id="markets-container">
				
			{
				markets === null ? 
				<Spinner /> 
				:
				markets.map((market) => (
					<Market market={market} key={market.id}/>
				))
			}	
		</MarketsContainer>
	);
}

export default (Markets);
