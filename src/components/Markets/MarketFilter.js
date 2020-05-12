import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {getMarketIds} from '../../utils/marketsUtils';
import filterIcon from '../../assets/filter-icon.svg'
import CheckBox from './CheckBox';
import { DARK_BLUE } from '../../constants';
import { useHistory, withRouter } from 'react-router-dom';
import gavel from './../../assets/gavel.png';

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
	border: 1px solid ${props => props.bgColor};
	opacity: 1;
	color: white;
	font-weight: 600;
	background-color: ${props => props.bgColor};
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
const Icon = styled.img`
	height: 11px;
	filter: invert(100%);
	transform: scaleX(-1);
`

const MarketFilter = ({setMarkets, markets, match}) => {
	const history = useHistory();
	const presetFilterOptions = match.params.filterOptions ? JSON.parse(match.params.filterOptions) : null;
	const [showFilter, setShowFilter] = useState(false);

	const [filterOptions, setFilterOptions] = useState({
		verified: presetFilterOptions ? presetFilterOptions.verified : true,
		liquidity: presetFilterOptions ? presetFilterOptions.liquidity : false,
		active: presetFilterOptions ? presetFilterOptions.active : false
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
	}, [match.params.filterOptions])

	const setParams = () => {
		history.push(`/filter/${JSON.stringify(filterOptions)}`);
	}

	const filter = async () => {
		let filteredMarkets = [...markets]
		
		if (filterOptions.liquidity) {
			filteredMarkets = filteredMarkets.filter(market => market.liquidity > 0);
		}

		if (filterOptions.active) {
			const now = new Date().getTime();
			filteredMarkets = filteredMarkets.filter(market => market.end_time > now)
		}
		setMarkets(filteredMarkets)
	}

	const handleSubmit = e => {
		e.preventDefault();
		setParams();
	}

	const toCreate = () => {
		history.push("/create")
	}
	const toGovern = () => {
		history.push("/govern")
	}



	return (
		<MarketFilterContainer >
			<FilterIcon onClick={toggleShowMarketFilter} src={filterIcon}/>
			<AddMarketButton bgColor={DARK_BLUE} onClick={toCreate}>+ Add market</AddMarketButton>
			<AddMarketButton bgColor={"#FFA800"} onClick={toGovern}><Icon src={gavel}/> Govern outcomes</AddMarketButton>
			{showFilter && <FilterSection onSubmit={handleSubmit}>
				<CheckBox
					checked={filterOptions.liquidity}
					toggleFilterOption={toggleFilterOption}
					value="liquidity"
					label="markets with liquidity"
				/>
				<CheckBox
					checked={filterOptions.active}
					toggleFilterOption={toggleFilterOption}
					value="active"
					label="only display active markets"
				/>

				<SubmitButton type="submit" value="apply"/>
				
			</FilterSection>}
		</MarketFilterContainer>
	);
}

export default withRouter(MarketFilter);
