import React, { useState } from 'react';
import styled from 'styled-components';
import Dispute from './Dispute';
import Resolute from './Resolute';
import Finalize from './Finalize';

const Container = styled.div`
	margin-bottom: 48px;
	border-radius: 8px;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
	padding: 25px;
	background-color: ${props => props.type === "finalize" ? "rgba(0, 255, 0, 0.3)" : props.type === "resolute" ? "rgba(255, 255, 0, 0.3)" : "rgba(255, 0,0, 0.3)"};
`

function MarketGovernance({data, getAndSetMarkets}) {
	const now = new Date().getTime();
	const lastResolutionWindow = data.resolution_windows[data.resolution_windows.length - 1]
	let type;

	if (data.resoluted) {
		if (data.disputed) {
			type = "finalize";
		} else if (lastResolutionWindow.end_time > now) {
			type = "dispute";
		} else {
			type = "finalize";
		}
	} else {
		type = "resolute";
	}
	const toReturn = () => {
		if (type === "resolute") {
			return <Resolute getAndSetMarkets={getAndSetMarkets} data={data}/>
		} else if (type === "finalize") {
			return <Finalize getAndSetMarkets={getAndSetMarkets} data={data}/>
		} else {
			return <Dispute getAndSetMarkets={getAndSetMarkets} data={data} />
		}
	}

	return(
		<Container type={type}>
			{toReturn()}
		</Container>
	)

}

export default MarketGovernance;