import React from 'react';
import styled from 'styled-components';

const TimeValue = styled.span`
	font-weight: bold;
`;
export default function CountDownTimer({ days, hours, minutes, seconds, completed }) {
	if (completed) {
	  return <div>Market ended</div>;
	} else {
	  return <div> ends in: <TimeValue>{days} days {hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes }:{seconds < 10 ? "0" + seconds : seconds}</TimeValue></div>;
	}
};