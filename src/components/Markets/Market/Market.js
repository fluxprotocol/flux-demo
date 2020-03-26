import React from 'react';
import styled from 'styled-components';
import { DARK_BLUE, PINK } from '../../../constants';
import ResolutedSection from './ResolutedSection';
import MarketContent from './MarketContent.js';
import { Link } from 'react-router-dom';

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

const AllMarketsButton = styled(Link)`
	padding-top: 14px;
	color: ${PINK};
	border: none;
	font-size: 18px;
	text-align: center;
	display: block;
`

function Market({market, specificId}) {
	return (
		<>
		<MarketContainer >
			{
				market 
				?
					!market.resoluted ? <MarketContent specificId={specificId} market={market}/> : <ResolutedSection market={market}/>
				:
				null
			}
		</MarketContainer>
		{specificId &&<AllMarketsButton to="/"> all markets</AllMarketsButton>}
		</>
	)
}

export default Market;