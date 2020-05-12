import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { capitalize } from '../../utils/stringManipulation';
import { DARK_BLUE, LIGHT_GRAY } from '../../constants';
import ExtraInfo from './ExtraInfo.js';
import OutcomeButton from './OutcomeButton.js';
import UserPositions from '../UserPositions';
import ResolutionDate from './ResolutionDate.js';
import { WebSocketContext } from '../WSProvider';
import { FluxContext } from '../FluxProvider';
import OrderModal from './OrderModal';
import { TwitterShareButton, TwitterIcon } from 'react-share';

const ButtonSection = styled.div`
  width: 100%;
`;

export const Description = styled.h1`
	font-size: 24px;
	color: ${DARK_BLUE};
	padding-top: 30px;
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
	cursor: pointer;
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

export const FirstHeader = styled(Header)`
	width: 50%;
	text-align: left;
`;

export const SecondHeader = styled(Header)`
	width: 25%;
	text-align: center;
`;
export const ThirdHeader = styled(Header)`
	width: 25%;
	text-align: right;
`;

const TopSection = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	justify-content: space-between;
`

const StyledTwitterShareButton = styled(TwitterShareButton)`
	display: inline-block;
	margin-top: 4px;
`

const MarketContent = ({...props}) => {
	const [{flux}, dispatch] = useContext(FluxContext);
	const [marketOrders, setMarketOrders] = useState([]);
	const [market, setMarket] = useState(props.market);
	const [selectedOutcome, setSelectedOutcome] = useState(null);
	const [showPositions, setShowPositions] = useState(false);
	const { end_time, description, outcomes, outcome_tags, extra_info } = market;
	const [ socket, _ ] = useContext(WebSocketContext);

	const getAndSetMarketPrices = async () => {
		const marketOrders = await market.getMarketPrices()
		setMarketOrders(marketOrders)
	}

	const getAndSetOrderbook = async () => {
		market.orderbooks = await market.getOrderbooks();
		setMarket(market);
	}

	useEffect(() => {
		let unmounted = false;
		if (!unmounted) getAndSetMarketPrices();
		return () => {
      unmounted = true; 
    };
	}, [])

	let buttons = [];
	if (outcomes > 2) {
		buttons = outcome_tags.map((tag, i) => (
			<OutcomeButton 
				market={market} 
				label={tag} 
				price={marketOrders[i]} 
				index={i} 
				key={i} 
				showOrderModal={() => setSelectedOutcome(i)} 
			/>
		));
	} else {
		for (let i = 0; i < 2; i++) {
			buttons.push(
				<OutcomeButton 
					market={market} 
					price={marketOrders[i]} 
					label={i === 0 ? "NO" : "YES" } 
					binary 
					index={i} 
					showOrderModal={() => setSelectedOutcome(i)} 
					key={i} 
				/>
			)
		}
	}

	return (
		<div>
			<TopSection>
				<StyledTwitterShareButton
					url={`https://app.flux.market/market/${market.id}`}
					title={`Checkout this @fluxprotocol market: ${market.description}`}
				>
					<TwitterIcon
						size={40}
						round
						iconFillColor={DARK_BLUE}
						bgStyle={
							{fill: "white"}
						}
					/>
				</StyledTwitterShareButton>
				<ResolutionDate endTime={end_time} />
			</TopSection>
			<Description>
				{ capitalize(description) }
				<ExtraInfo data={extra_info} market={market}/>
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
			{selectedOutcome !== null && <OrderModal price={marketOrders[selectedOutcome]} outcome={selectedOutcome} market={market} hideOrderModal={() => setSelectedOutcome(null)}/>}
		</div>

	);
};

export default MarketContent;