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
		console.log()
		console.log(outcomeTags)
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
							console.log(outcome);
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


// import React, { PureComponent } from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';

// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
// ];

// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

//   render() {
//     return (
//       <LineChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 5, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//         <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//       </LineChart>
//     );
//   }
// }

