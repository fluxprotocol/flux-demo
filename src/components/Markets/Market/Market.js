import React from 'react';
import '@material/react-text-field/dist/text-field.min.css';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { DARK_BLUE } from '../../../constants';
import Loader from './../../Loader.js';
import ResolutedSection from './ResolutedSection';
import MarketContent from './MarketContent.js';

const MarketContainer = styled.div`
  width: 90%;
  padding: 0 5%;
	margin-top: 25px;
  position: relative;
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

function Market({market, marketLoading}) {
	return (
		<MarketContainer >
			{marketLoading === market.id && <Loader />}
			{
				!market.resoluted ? <MarketContent market={market}/> : <ResolutedSection />
			}
		</MarketContainer>
	)
}


const mapStateToProps = (state) => ({
	accountData: state.account,
	orderType: state.market.orderType,
	txLoading: state.market.loading,
	marketLoading: state.market.marketLoading,
	contract: state.near.contract
})

export default connect(mapStateToProps)(Market);
