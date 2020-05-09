import React from 'react';
import styled from 'styled-components';
import Dispute from './Dispute';
import Resolute from './Resolute';
import Finalize from './Finalize';

const Market = styled.div`

`

function MarketGovernance({data}) {
	const now = new Date().getTime();
	const lastResolutionWindow = data.resolution_windows[data.resolution_windows.length - 1]
	if (data.resoluted) {
		if (data.disputed) {
			return <Finalize data={data}/>
		} else if (lastResolutionWindow.end_time > now) {
			return <Dispute data={data} />
		} else {
			return <Finalize data={data} />
		}
	} else return <Resolute data={data}/>
}

export default MarketGovernance;