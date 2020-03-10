import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { capitalize } from '../../../utils/stringManipulation';
import { DARK_BLUE, LIGHT_GRAY} from '../../../constants';
import ExtraInfo from './ExtraInfo.js';
import OutcomeButton from './OutcomeButton.js';
import UserPositions from './UserPositions/UserPositions.js';
import ResolutionDate from './ResolutionDate.js';

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

const MarketContent = ({socket, ...props}) => {
	console.log("rendered", props.market.id)
	const [marketOrders, setMarketOrders] = useState([]);
	let [market, setMarket] = useState(props.market);
	const [showPositions, setShowPositions] = useState(false);
	const { end_time, description, outcomes, outcome_tags, extra_info } = market;

	const updateMarket = () => market.updateMarket().then(updatedMarket => setMarket(updatedMarket));

	const getAndSetMarketPrices = () => {
		market.getMarketPrices().then(marketOrders => {
			setMarketOrders(marketOrders)}
		);
	}

	// TODO: No need to rerender entire component on market price update.
	useEffect(() => {
		let unmounted = false;
		socket.on("order_placed", ({marketId}) => {
			if (marketId === market.id) updateMarket();
		});
		if (!unmounted) getAndSetMarketPrices();
		return () => {

      unmounted = true; 
    };
	}, [])

	let buttons = [];
	if (outcomes > 2) {
		buttons = outcome_tags.map((tag, i) => (
			<OutcomeButton updateMarketOrders={getAndSetMarketPrices} market={market} label={tag} price={marketOrders[i]} index={i} key={i} />
		));
	} else {
		for (let i = 0; i < 2; i++) {
			buttons.push(<OutcomeButton updateMarketOrders={getAndSetMarketPrices} market={market} price={marketOrders[i]} label={i === 0 ? "NO" : "YES" } binary index={i} key={i} />)
		}
	}

	return (
		<div>
			<ResolutionDate endTime={end_time} />
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
			{showPositions && <UserPositions updateMarketOrders={getAndSetMarketPrices} market={market} closeModal={() => setShowPositions(false)}/>}
			<PositionsButton onClick={() => setShowPositions(true)}>my positions</PositionsButton>
		</div>
	);
};

export default MarketContent;