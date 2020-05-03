import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {getMarketIds} from '../../utils/marketsUtils';
import filterIcon from '../../assets/filter-icon.svg'
import CheckBox from './CheckBox';
import { BLUE, DARK_BLUE } from '../../constants';

const MarketFilterContainer = styled.div`
	padding: 0 5%;
  display: block;
  margin: 0 auto;
	margin-top: 80px;
	margin-bottom: 30px;

`

const FilterIcon = styled.img`
	width: 20px;
	border: 1px solid grey;
	opacity: 0.6;
	padding: 5px;
	border-radius: 6px;
	cursor: pointer;
`

const FilterSection = styled.form`

`

const SubmitButton = styled.input`
	background: ${DARK_BLUE};
	color: white;
	font-size: 18px;
	border-style: outset;
	border-color: #0066A2;
	padding: 7px 15px;
	text-shadow:none;
	border-radius: 12px;
	display: block;
	margin-top: 15px;
`

const MarketFilter = ({setMarkets, markets}) => {
	const [showFilter, setShowFilter] = useState(false);
	const [filterOptions, setFilterOptions] = useState({
		verified: true,
		liquidity: false
	})

	const toggleShowMarketFilter = () => setShowFilter(!showFilter);

	const toggleFilterOption = val => {
		const toggleState = {...filterOptions};
		toggleState[val] = !toggleState[val];
		setFilterOptions(toggleState)
	}

	useEffect(() => {
		let unmounted = false;
		if (!unmounted) filter();
		return () => {
			unmounted = true
		}
	}, [])

	const filter = async () => {
		let filteredMarkets = [...markets]
		if (filterOptions.verified) {
			const res = await getMarketIds([]);
			filteredMarkets = filteredMarkets
												.filter(market => {
													return res.markets.findIndex(verifiedMarket => {
														return market.id == verifiedMarket.marketId
													}) > -1
												})
		}

		if (filterOptions.liquidity) {
			filteredMarkets = filteredMarkets.filter(market => market.liquidity > 0);
		}

		setMarkets(filteredMarkets)
	}

	const handleSubmit = e => {
		e.preventDefault();
		filter();
	}

	return (
		<MarketFilterContainer >
			<FilterIcon onClick={toggleShowMarketFilter} src={filterIcon}/>
			{showFilter && <FilterSection onSubmit={handleSubmit}>
				<CheckBox
					checked={filterOptions.verified}
					toggleFilterOption={toggleFilterOption}
					value="verified"
					label="only verified markets"
				/>
				<CheckBox
					checked={filterOptions.liquidity}
					toggleFilterOption={toggleFilterOption}
					value="liquidity"
					label="markets with liquidity"
				/>

				<SubmitButton type="submit" value="filter"/>
				
			</FilterSection>}
		</MarketFilterContainer>
	);
}

export default MarketFilter;
