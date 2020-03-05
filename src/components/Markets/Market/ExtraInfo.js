import React, {useState} from 'react';
import styled from 'styled-components';
import { DARK_BLUE, WHITE } from '../../../constants';

const ExtraInfoContainer = styled.div`
	padding: 20px 0 ;
`;

const ShowInfoButton = styled.button`
	border: 1px solid ${DARK_BLUE};
	margin: 0;
	padding: 0 4px;
	width: 18px;
	height: 17px;
	color: ${DARK_BLUE};
	text-align: center;
	display: block;
	border-radius: 50%;
	background-color: ${WHITE};
	margin:  auto;
	display: block;
`

const Title = styled.p`
	font-weight: medium;
	margin: 0;
	font-size: 12px;
`
const Info = styled.p`
	font-weight: lighter;
	margin: 0;
	font-size: 12px;
`

export default function ExtraInfo({data}) {
	let [showInfo, toggleShowInfo] = useState(false);

	return (
		<ExtraInfoContainer>
			<ShowInfoButton onClick={() => toggleShowInfo(!showInfo)}>{showInfo ? "-" : "+"}</ShowInfoButton>
			{
				showInfo && (
					<div>
						<Title>extra info:</Title> 
						<Info>{data}</Info>
					</div>
				)
			}
			
		</ExtraInfoContainer>
	)
};