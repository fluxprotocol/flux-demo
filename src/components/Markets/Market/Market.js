import React from 'react';
import styled from 'styled-components';
import { DARK_BLUE } from '../../../constants';
import ResolutedSection from './ResolutedSection';
import MarketContent from './MarketContent.js';

const MarketContainer = styled.div`
  width: 90%;
  padding: 0 5%;
	margin-top: 25px;
  position: static;
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

function Market({market}) {
	return (
		<MarketContainer >
			{
				!market.resoluted ? <MarketContent market={market}/> : <ResolutedSection market={market}/>
			}
		</MarketContainer>
	)
}

export default Market;