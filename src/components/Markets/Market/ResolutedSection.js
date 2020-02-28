import React from 'react';
import styled from 'styled-components';
import { DARK_BLUE } from '../../../constants';

const ResolutedContainer = styled.div`
	display: block;
	width: 100%;
`;
const ResolutionTitle = styled.h2`
	text-align: center;
`;
const Resolution = styled.span`
	width: 100%;
	text-align: center;
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
	width: 80%;
	left: 10%;
	bottom: 25px;
`;

const ResolutedSection = () => {
	return (
		<ResolutedContainer>
			<ResolutionTitle>
				{/* Resoluted: <Resolution>{fromPayoutDistribution(market.payout_multipliers).toUpperCase()}</Resolution> */}
			</ResolutionTitle>

			{/* <ClaimButton onClick={() => {
				// dispatch(claimEarnings(accountData.account, market.id, updateUserBalance))
			}}>Claim ${earnings}</ClaimButton>  */}
		</ResolutedContainer>
	);
};

export default ResolutedSection;