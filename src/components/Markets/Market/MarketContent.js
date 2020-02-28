import React from 'react';
import styled from 'styled-components';
import Countdown from 'react-countdown-now';
import CountdownTimer from './CountdownTimer.js';
import { capitalize } from '../../../utils/stringManipulation';
import { DARK_BLUE } from '../../../constants';
import { moreThanWeekFromNow } from '../../../utils/dateUtils.js';
import EndDate from './EndDate.js';
import ExtraInfo from './ExtraInfo.js';
import OutcomeButton from './OutcomeButton.js';

const ButtonSection = styled.div`
  width: 100%;
`;
const Description = styled.h1`
	font-size: 24px;
	color: ${DARK_BLUE};
	padding-top: 70px;
	display: block;
	font-weight: 500;
	margin: 0 auto;
`

const TimeIndicator = styled.span`
  position: absolute;
  top: 10px;
	font-size: 12px;
  right: 5%;
  color: ${DARK_BLUE};
`;

const PositionsButton = styled.p`
	text-decoration: underline;
	color: ${DARK_BLUE};
	font-weight: bold;
	font-size: 14px;
	padding: 14px 0;
	text-align: center;
`;


const MarketContent = ({market}) => {
	const { end_time, description, outcomes, outcome_tags, extra_info } = market;
	
	let buttons = [];

	// TODO: check if 2 outcomes, if so then create binary market colors with yesno
	if (outcomes > 2) {
		buttons = outcome_tags.map((tag, i) => (
			<OutcomeButton label={tag} key={i} />
		));
	} else {
		for (let i = 0; i < 2; i++) {
			buttons.push(<OutcomeButton label={i === 0 ? "NO" : "YES" } binary index={i} key={i} />)
		}
	}
	return (
		<div>
			<TimeIndicator>
				{
					moreThanWeekFromNow(end_time) ? <EndDate endTime={end_time}/> : 	<Countdown zeroPadTime={2} date={end_time} renderer={CountdownTimer} />
				}
			</TimeIndicator>
			<Description>{ 
				capitalize(description) }
				<ExtraInfo data={extra_info}/>
			</Description>
			<ButtonSection>
				{buttons}
			</ButtonSection>

				<PositionsButton>my positions</PositionsButton>
		</div>
	);
};

export default MarketContent;