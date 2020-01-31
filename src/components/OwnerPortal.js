import React, { useState } from 'react';
import styled from 'styled-components';
import OwnerPortalMarket from './OwnerPortalMarket';
import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';
import { updateMarkets } from '../actions/marketsActions';
import BN from 'bn.js';

const OwnerPortalContainer = styled.div`
`;
const ShowHideButton = styled.button``;

const OwnerPortal = ({markets, contract, dispatch, account}) => {
	const [description, setDescription] = useState('new market');
	const [endTime, setEndtime] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
	const [show, toggleShow] = useState(false);

	const getMarkets = () => {
		dispatch(updateMarkets(contract));
	}
	const createMarket = async (e) => {
		console.log("creating market...")
		e.preventDefault();
		// Only access to allowance
		account.functionCall(
			window.nearConfig.contractName,
			"create_market",
			{
				outcomes: 2,
				description: description,
				end_time: endTime.getTime()
			},
			new BN("10000000000000"),
			new BN("0")
		).then(() => {
			getMarkets()
		})
	}

	return (
		<>
			<ShowHideButton onClick={e => toggleShow(!show)}>{show ? "-" : "+"}</ShowHideButton>
			{show && <OwnerPortalContainer>
				<label>New market:</label>
				<form onSubmit={ (e) => createMarket(e) }>
					<input
						type="text"
						value={description}
						onChange={event => setDescription(event.target.value)} 
					/>

					<label>end time:</label>
					<DateTimePicker
						value={endTime}
						onChange={setEndtime} 
					/>
					<button type="submit">-></button>
				</form>
				{ 
					markets.map((market, i) => {
						return <OwnerPortalMarket 
											key={i}
											updateMarkets={getMarkets}
											market={market} 
										/>
					})
				}
			</OwnerPortalContainer>}
		</>
	);
};

const mapStateToProps = (state) => ({
	contract: state.near.contract,
	markets: state.markets.markets,
	account: state.account.account
	
})

export default connect(mapStateToProps)(OwnerPortal);