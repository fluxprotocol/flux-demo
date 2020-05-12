import React from 'react';
import { MarketContainer } from '../Market';
import styled from 'styled-components';
import { Description, HeaderSection, FirstHeader, SecondHeader, ThirdHeader } from '../Market/MarketContent';
import ExtraInfo from '../Market/ExtraInfo';
import OutcomeDummyButton from './OutcomeDummyButton';
import IPhone from './../../assets/iphone.png';

const Container = styled.div`
	width: 50%;
	max-width: 350px;
	position: relative;
	padding-top: 60px;
	display: inline-block;
	@media (max-width: 700px) {
		display: none;
	}
`

const StyledMarketContainer = styled(MarketContainer) `
	padding-bottom: 80px;
	width: 80%;
	margin: auto;
	display: block;
	max-height: 600px;
	overflow-y:scroll;

`
const IPhoneStyled = styled.img`
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
`


const StyledDescription = styled(Description)`
`

function MarketDummy ({description, outcomes, outcomeTags}) {
	let buttons = []
	
	if (outcomes > 2) {
		for (let i = 0; i < outcomes; i++) {
			const tag = outcomeTags[i];
			buttons.push(<OutcomeDummyButton label={tag ? tag : `outcome ${i}`} price={0} index={i} key={i} />)
		}

	} else {
		for (let i = 0; i < 2; i++) {
			buttons.push(<OutcomeDummyButton price={0} label={i === 0 ? "NO" : "YES" } binary index={i} key={i} />)
		}
	}

	return (
		<Container>
			<IPhoneStyled src={IPhone}/>
			<StyledMarketContainer>
				<StyledDescription>{description ? description : "Will x happen by Y?"}</StyledDescription>
				<ExtraInfo onClick={(e) => e.preventDefault()}/>

				<HeaderSection>
					<FirstHeader>contract</FirstHeader>
					<SecondHeader>last price traded</SecondHeader>
					<ThirdHeader>market price</ThirdHeader>
				</HeaderSection>

				{buttons}
			</StyledMarketContainer>
		</Container>
	)
}

export default MarketDummy;