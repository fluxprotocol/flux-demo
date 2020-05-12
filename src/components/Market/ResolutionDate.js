import React from 'react';
import styled from 'styled-components';
import { moreThanWeekFromNow } from '../../utils/dateUtils.js';
import Countdown from 'react-countdown-now';
import CountdownTimer from './CountdownTimer.js';
import EndDate from './EndDate.js';
import { DARK_BLUE } from '../../constants.js';

const TimeIndicator = styled.span`
	font-size: 12px;
  color: ${DARK_BLUE};
	padding-top: 18px;
`;

export default function ResolutionDate({endTime, className}) {
	const ended = endTime <= new Date().getTime();
	
	return (
		<TimeIndicator className={className}>
			{
				moreThanWeekFromNow(endTime) || ended ? <EndDate ended={ended} endTime={endTime}/> : 	<Countdown zeroPadTime={2} date={endTime} renderer={CountdownTimer} />
			}
		</TimeIndicator>
	)
};