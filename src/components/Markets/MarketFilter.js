import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {getMarketIds} from '../../utils/marketsUtils';
import filterIcon from '../../assets/filter-icon.svg'
import CheckBox from './CheckBox';
import { DARK_BLUE } from '../../constants';
import { useHistory } from 'react-router-dom';

const MarketFilterContainer = styled.div`
	padding: 0 5%;
  display: inline-block;
	width: 60%;
	margin-top: 10px;
	margin-bottom: 30px;

`

const FilterIcon = styled.img`
	width: 20px;
	border: 1px solid grey;
	opacity: 0.6;
	padding: 5px;
	border-radius: 6px;
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;

`

const AddMarketButton = styled.button`
	border: 1px solid ${DARK_BLUE};
	opacity: 1;
	color: white;
	font-weight: 600;
	background-color: ${DARK_BLUE};
	padding: 5px;
	border-radius: 6px;
	margin-left: 15px;
	cursor: pointer;
	vertical-align: middle;
	display: inline-block;
`

const FilterSection = styled.form`
	margin-top: 15px;
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
	const history = useHistory();
	const [showFilter, setShowFilter] = useState(false);
	const [filterOptions, setFilterOptions] = useState({
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
		filter();
		return () => {
			unmounted = true
		}
	}, [])

	const filter = async () => {
		let filteredMarkets = [...markets]
		
		if (filterOptions.liquidity) {
			filteredMarkets = filteredMarkets.filter(market => market.liquidity > 0);
		}

		setMarkets(filteredMarkets)
	}

	const handleSubmit = e => {
		e.preventDefault();
		filter();
	}

	const toCreate = () => {
		history.push("/create")
	}

	return (
		<MarketFilterContainer >
			<FilterIcon onClick={toggleShowMarketFilter} src={filterIcon}/>
			<AddMarketButton onClick={toCreate}>+ Add market</AddMarketButton>
			{showFilter && <FilterSection onSubmit={handleSubmit}>
				<CheckBox
					checked={filterOptions.liquidity}
					toggleFilterOption={toggleFilterOption}
					value="liquidity"
					label="markets with liquidity"
				/>

				<SubmitButton type="submit" value="apply"/>
				
			</FilterSection>}
		</MarketFilterContainer>
	);
}

export default MarketFilter;
