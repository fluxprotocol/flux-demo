import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { DARK_BLUE } from '../../../constants';
import ResolutionDate from './ResolutionDate';
import { Description } from './MarketContent';
import { capitalize } from '../../../utils/stringManipulation';
import { daiToDollars } from '../../../utils/unitConvertion';
import { FluxContext } from '../../FluxProvider';

const ResolutedContainer = styled.div`
	display: block;
	width: 100%;
`;
const ResolutionTitle = styled.h2`
	font-weight: 400;
	font-size: 14px;
`;
const Resolution = styled.span`
	width: 100%;
	font-weight: bold;
`;

const ClaimButton = styled.button`
	background-color: ${DARK_BLUE};
	color: white;
	border-radius: 6px;
	padding: 15px;
	font-size: 16px;
	border: none;
	box-sizing: border-box;
  -webkit-box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  -moz-box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
	width: 100%;
	left: 10%;
	font-weight: bold;
	bottom: 25px;
	margin: 25px 0;
`;


const ResolutedSection = ({market}) => {
	const [{flux}, dispatch] = useContext(FluxContext);

	const updateBalance = async () => {
		const updatedBalance = await flux.getFDaiBalance(flux.getAccountId());
		dispatch({type: "balanceUpdate", payload: {balance: updatedBalance}});
	}
	const [claimable, setClaimable] = useState(null);
	const updateClaimable = () => flux.getClaimable(market.id, flux.getAccountId()).then(res => setClaimable(res));

	const onClaimClick = async () => {
		await flux.claimEarnings(market.id, flux.getAccountId());
		updateClaimable();
		updateBalance();
	}

	useEffect(() => {
		let mounted = false;
		if (!mounted) updateClaimable();
		return () => {
			mounted = true;
		};
	}, []);

	let resolution;
	if (market.outcomes === 2) {
		if (market.winning_outcome === 0) resolution = "NO";
		else if (market.winning_outcome === 1) resolution = "Yes";
		else resolution = "Invalid";
	} else {
		resolution = market.outcome_tags[market.winning_outcome] ? market.outcome_tags[market.winning_outcome] : "invalid"
	}

	return (
		<ResolutedContainer>
			<ResolutionDate endTime={market.end_time}/>
			<Description>{capitalize(market.description)}</Description>
			<ResolutionTitle>
				Resolution: <Resolution>{resolution}</Resolution>
			</ResolutionTitle>

			<ClaimButton onClick={onClaimClick}>Claim ${daiToDollars(claimable)}</ClaimButton> 
 	</ResolutedContainer>
	);
};

export default ResolutedSection;