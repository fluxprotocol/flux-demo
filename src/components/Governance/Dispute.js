import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FluxContext } from './../FluxProvider';
import { dollarsToDai, outcomeToTag } from '../../utils/unitConvertion';
import Countdown from 'react-countdown-now';
import GovernanceAction from './GovernanceAction';
import DisputeTimer from './DisputeTimer';
import StandardTXLoader, { DEFAULT_STATE } from '../StandardTxLoader';

const Container = styled.div``
const CurrentOutcome = styled.h3``
const Title = styled.h1``

function Dispute({ data }) {
	const [{flux}, ] = useContext(FluxContext)
	const [newWinningOutcome, setNewWinningOutcome] = useState(false);
	const [isloading, setIsLoading] = useState(DEFAULT_STATE);

	const handleDispute = async (e) => {
		e.preventDefault();

		setIsLoading({loading: true, res: null, err: null});

		flux.dispute(data.id, newWinningOutcome, dollarsToDai(10))
		.then(res => {
			setIsLoading({ loading: false, res: "success", err: false })
		})
		.catch(err => {
			console.error(err)
			setIsLoading({ loading: false, res: "oops, something went wrong", err: true })
		})
	};

	const closeLoader = () => {
		setIsLoading(DEFAULT_STATE)
	}

	return (
		<Container>
			<Title>DISPUTABLE: {data.description}</Title>
			<span>Dispute window open for: </span>
			<Countdown zeroPadTime={2} date={data.resolution_windows[data.resolution_windows.length - 1].end_time} renderer={DisputeTimer}/>
			<CurrentOutcome>Last outcome: {outcomeToTag(data.winning_outcome, data.outcome_tags)}</CurrentOutcome>
			<GovernanceAction

				onSubmit={handleDispute} 
				actionName="Dispute" 
				data={data}
				setNewWinningOutcome={setNewWinningOutcome}
				newWinningOutcome={newWinningOutcome}
			/>
			{(isloading.loading || isloading.res) && <StandardTXLoader res={isloading.res} err={isloading.err} closeLoader={closeLoader} />}
		</Container>
	)
}

export default Dispute