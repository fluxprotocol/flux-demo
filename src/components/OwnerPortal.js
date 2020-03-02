import React, { useState } from 'react';
import styled from 'styled-components';
import OwnerPortalMarket from './OwnerPortalMarket';
import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';
import { updateMarkets } from '../actions/marketsActions';
import BN from 'bn.js';

const OwnerPortalContainer = styled.div`
	position: absolute;
	top: 250px;
	left: 50px;
	background-color: white;
`;
const ShowHideButton = styled.button`
	position: absolute;
	top: 250px;
	left: 50px;
`;

const OwnerPortal = ({markets, contract, dispatch, account}) => {
	const [description, setDescription] = useState('new market');
	const [extraInfo, setExtraInfo] = useState('');
	const [outcomes, setOutcomes] = useState(2);
	const [endTime, setEndtime] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
	const [show, toggleShow] = useState(true);
	let outcomeTags = [];
	let outcomeTagInputs = [];

	if (outcomes > 2) {
		for (let i = 0; i < outcomes; i++ ) {	
			outcomeTagInputs.push(
				<input
					key={i}
					type="text"
					placeholder={`outcome tag: ${i}`}
					onChange={event => {
						outcomeTags[i] = event.target.value;
					}} 
				/>
			)
		}
	}


	const getMarkets = () => {
		dispatch(updateMarkets(contract));
	}
	const createMarket = async (e) => {
		console.log("creating market...");
		e.preventDefault();
		account.functionCall(
			window.nearConfig.contractName,
			"create_market",
			{
				description,
				extra_info: extraInfo,
				outcomes: parseInt(outcomes),
				outcome_tags: outcomeTags,
				end_time: endTime.getTime() + 1000000
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
					<input
						type="text"
						value={extraInfo}
						placeholder="extra info"
						onChange={event => setExtraInfo(event.target.value)} 
					/>
					<input
						type="text"
						value={outcomes}
						onChange={event => setOutcomes(event.target.value)} 
					/>

					{outcomeTagInputs}

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