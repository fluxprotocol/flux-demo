import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Countdown from 'react-countdown-now';
import CountdownTimer from './CountdownTimer.js';
import { capitalize } from '../../../utils/stringManipulation';
import { DARK_BLUE, LIGHT_GRAY} from '../../../constants';
import { moreThanWeekFromNow } from '../../../utils/dateUtils.js';
import EndDate from './EndDate.js';
import ExtraInfo from './ExtraInfo.js';
import OutcomeButton from './OutcomeButton.js';
import UserPositions from './UserPositions/UserPositions.js';

const ButtonSection = styled.div`
  width: 100%;
`;

export const Description = styled.h1`
	font-size: 24px;
	color: ${DARK_BLUE};
	padding-top: 55px;
	display: block;
	font-weight: 500;
	margin: 0 auto;
`

export const TimeIndicator = styled.span`
	font-size: 12px;
  color: ${DARK_BLUE};
	display: block;
	width: 100%;
	text-align: right;
	padding-top: 18px;
`;

const PositionsButton = styled.p`
	text-decoration: underline;
	color: ${DARK_BLUE};
	font-weight: bold;
	font-size: 14px;
	padding: 14px 0;
	text-align: center;
`;

export const HeaderSection = styled.div`
	color: ${LIGHT_GRAY};
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: calc(100% - 30px);
	padding: 0 15px;
	margin: auto;
`;

export const Header = styled.p`
	font-size: 10px;
	font-weight: 900;
	margin: 0;
	padding: 0;
`

const FirstHeader = styled(Header)`
	width: 50%;
	text-align: left;
`;

const SecondHeader = styled(Header)`
	width: 25%;
	text-align: center;
`;
const ThirdHeader = styled(Header)`
	width: 25%;
	text-align: right;
`;

const MarketContent = ({market}) => {
	const [marketOrders, setMarketOrders] = useState([]);

	const [showPositions, setShowPositions] = useState(false);

	const { end_time, description, outcomes, outcome_tags, extra_info } = market;
	useEffect(() => {
		let unmounted = false; // new stuff here

		market.getMarketPrices().then(marketOrders => {
			if (!unmounted) setMarketOrders(marketOrders)}
		);
		return () => {
      unmounted = true; // new stuff here
    };
	}, [])

	let buttons = [];
	if (outcomes > 2) {
		buttons = outcome_tags.map((tag, i) => (
			<OutcomeButton market={market} label={tag} price={marketOrders[i]} index={i} key={i} />
		));
	} else {
		for (let i = 0; i < 2; i++) {
			buttons.push(<OutcomeButton market={market} price={marketOrders[i]} label={i === 0 ? "NO" : "YES" } binary index={i} key={i} />)
		}
	}
	return (
		<div>
			<TimeIndicator>
				{
					moreThanWeekFromNow(end_time) ? <EndDate endTime={end_time}/> : 	<Countdown zeroPadTime={2} date={end_time} renderer={CountdownTimer} />
				}
			</TimeIndicator>
			<Description>
				{ capitalize(description) }
				<ExtraInfo data={extra_info}/>
			</Description>
			
			<HeaderSection>
				<FirstHeader>contract</FirstHeader>
				<SecondHeader>last price traded</SecondHeader>
				<ThirdHeader>market price</ThirdHeader>
			</HeaderSection>
			<ButtonSection>
				{buttons}
			</ButtonSection>
			{showPositions && <UserPositions market={market} closeModal={() => setShowPositions(false)}/>}
			<PositionsButton onClick={() => setShowPositions(true)}>my positions</PositionsButton>
		</div>
	);
};

export default MarketContent;