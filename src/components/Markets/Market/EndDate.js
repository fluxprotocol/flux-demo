import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

const TimeValue = styled(Moment)`
	font-weight: bold;
`;

export default function EndDate({endTime}) {

	return <div>resolution date: <TimeValue format="DD/MM/YYYY">{new Date(endTime)}</TimeValue></div>
};