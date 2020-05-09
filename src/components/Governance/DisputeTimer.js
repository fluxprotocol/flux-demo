import React from 'react';
import styled from 'styled-components';

const TimeValue = styled.span`
	font-weight: bold;
`;

function DisputeTimer({days, hours, minutes, seconds}) {
	return <TimeValue>{days} days {hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes }:{seconds < 10 ? "0" + seconds : seconds}</TimeValue>
}

export default DisputeTimer