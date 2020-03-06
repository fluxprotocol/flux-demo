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

	@media (min-width: 560px) {
		margin-top: 115px;
	}
`

const Markets = ({markets, loading, socket}) => {

	return (
		<MarketsContainer id="markets-container">
				
			{
				loading ? 
				<Spinner /> 
				:
				markets.map((market, i) => (
					<Market socket={socket} market={market} key={i}/>
				))
			}	
		</MarketsContainer>
	);
}

const mapStateToProps = (state) => ({
	markets: state.markets.markets,
	socket: state.auth.socket,
	loading: state.markets.loading
})
export default connect(mapStateToProps)(Markets);
