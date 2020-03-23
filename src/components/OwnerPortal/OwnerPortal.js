import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import OwnerPortalMarket from './OwnerPortalMarket';
import DateTimePicker from 'react-datetime-picker';
import BN from 'bn.js';
import { FluxContext } from '../FluxProvider';

const OwnerPortalContainer = styled.div`
	padding-top: 250px;
	background-color: white;
`;
const ShowHideButton = styled.button`
	padding-top: 250px;
	position: absolute;
`;

const OwnerPortal = ({markets = []}) => {
	const [flux, dispatch] = useContext(FluxContext);
	const [isOwner, setIsOwner] = useState(false);
	const [description, setDescription] = useState('new market');
	const [extraInfo, setExtraInfo] = useState('');
	const [outcomes, setOutcomes] = useState(2);
	const [endTime, setEndtime] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
	const [show, toggleShow] = useState(false);
	const [outcomeTags, setOutcomeTags] = useState([]);
	const outcomeInputs = [];

	const getIsOwner = async () => {
    if (!flux.walletConnection.isSignedIn()) return false;
    const owner = await flux.contract.get_owner();
    return owner === flux.getAccountId();
	}
	
	const setOutcomeTag = (value, i) => {
		const updatedTags = outcomeTags;
		updatedTags[i] = value;
		setOutcomeTags(updatedTags);
	}

	if (outcomes > 2) {
		for (let i = 0; i < outcomes; i++) {
			outcomeInputs.push(
				<input type="text" key={i} value={outcomeTags[i]} onChange={e => setOutcomeTag(e.target.value, i)}/>
			)
		}
	} 

  useEffect(() => {
    getIsOwner().then(res => setIsOwner(res));
  }, []);

	
	const createMarket = async (e) => {
		console.log("creating market...");
		e.preventDefault();
		await flux.createMarket(description, extraInfo, outcomes, outcomeTags, ["test"], endTime.getTime())
	}

	return (
		isOwner ?
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

					{outcomeInputs}

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
											// updateMarkets={getMarkets}
											market={market} 
										/>
					})
				}
			</OwnerPortalContainer>}
		</>
		:
		<div></div>
	);
};

export default OwnerPortal;