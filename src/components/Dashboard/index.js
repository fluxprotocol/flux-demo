import React, { useContext, useEffect, useState } from 'react';
import { getTransactions } from './explorer-api';
import { FluxContext, connect } from '../FluxProvider';
import formatData from './formatData';
import allTxLatest from './allTxLatest';
import { LineChart, Line, YAxis, XAxis, Tooltip } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
	padding: 0 5%;
`

const Title = styled.h1`
`

function Dashboard() {
	const [flux, dispatch] = useContext(FluxContext);
	const [charts, setCharts] = useState([]);
	const [loadingState, setLoadingState] = useState("fetching");

	const fetchData = async () => {
		const allData = await getTransactions("flux-protocol-dev");
		return JSON.stringify(allData);
	}

	const formatToolTip = (value, name, outcomeTags) => {

		if (outcomeTags.length > 0) {
			name = outcomeTags[name];
		} else {
			name = name === "0" ? "NO" : "YES";
		}
		return [value, name]
	}

	useEffect(() => {

		fetchData().then(tx => {
			setLoadingState("formatting");
			const data = formatData(JSON.parse(tx));
			mapOutcomeTagsToOutcomes(data).then(mappedData => {

				const elems = Object.keys(mappedData).map((marketId, i) => {

					const marketData = data[marketId];
					let lines = []
					
					const colors = [
						"red",
						"blue",
						"purple",
					]
					
					marketData.data.forEach(entry => {
						const keys = Object.keys(entry);
						for (let i = 0; i < keys.length -1; i++) {
							const outcome = keys[i];
							if (!lines[outcome]) lines[outcome] = <Line type="monotone" dataKey={outcome} key={i} stroke={colors[i]}/>
						}
					})
					if (marketData.description !== "new market") {
						return (
							<ChartContainer key={i} >
								<Title>{marketData.description}</Title>
								<LineChart width={400} height={400} data={marketData.data}>
									{lines}
									<Tooltip formatter={(value, name) => formatToolTip(value, name, marketData.outcomeTags)} />
									<XAxis dataKey="date"/>
									<YAxis />
								</LineChart>
							</ChartContainer>
						)
					} else {
						return null
					}
				})
				setCharts(elems);
				setLoadingState(null);
			});
		})
	}, [])

	const mapOutcomeTagsToOutcomes = async (data) => {
		const fluxInstance = await connect();
		const allMarkets=  await fluxInstance.getAllMarkets();
		
		Object.keys(data).forEach(marketId => {
			const market = allMarkets[marketId];
			data[marketId]["outcomeTags"] = market.outcome_tags;
		})
	
		return data;
	}

	if (loadingState === "fetching") {
		return (
			<div> fetching latest order data from NEAR explorer... </div>
		)
	} else if (loadingState === "formatting") {
		return <div> formatting data... </div>
	} else {
		return (
			<div>
				{charts}
			</div>
	
		);
	}

}

export default Dashboard;