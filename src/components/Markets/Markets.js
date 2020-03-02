import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Market from './Market/Market';
import Spinner from '../Spinner';

const MarketsContainer = styled.div`
  width: 100%;
  display: block;
  margin: 0 auto;
	margin-top: 80px;
	margin-bottom: 30px;
`

const Markets = ({markets, loading}) => {

	return (
		<MarketsContainer id="markets-container">
				
			{
				loading ? 
				<Spinner /> 
				:
				markets.map((market, i) => (
					<Market market={market} key={i}/>
				))
			}	
		</MarketsContainer>
	);
}

const mapStateToProps = (state) => ({
	markets: state.markets.markets,
	loading: state.markets.loading
})
export default connect(mapStateToProps)(Markets);
