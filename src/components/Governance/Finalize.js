import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FluxContext } from './../FluxProvider';
import { outcomeToTag } from '../../utils/unitConvertion';
import GovernanceAction from './GovernanceAction';
import StandardTXLoader, { DEFAULT_STATE } from '../StandardTxLoader';

const Container = styled.div``
const CurrentOutcome = styled.h3``
const Title = styled.h1``

function Finalize({ data, getAndSetMarkets }) {
	const [{flux}, ] = useContext(FluxContext)
	const [newWinningOutcome, setNewWinningOutcome] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [isLoading, setIsLoading] = useState(DEFAULT_STATE);

	useEffect(()=>{
		let unmounted = false;

		flux.contract.get_owner().then(owner => {
			if (!unmounted) setIsOwner(owner === flux.getAccountId())
		})

		return () => {
			unmounted = true;
		}
	}, []);

	const handleFinalization = async (e) => {
		e.preventDefault();
		setIsLoading({...isLoading, loading: true})
		flux.finalize(data.id, newWinningOutcome)
		.then(res => {
			setIsLoading({loading: false, err: false, res: "success"})
			getAndSetMarkets();
		})
		.catch(err => {
			console.error(err)
			setIsLoading({loading: false, err: false, res: "oops, something went wrong"})
		})
<<<<<<< HEAD
	
=======
>>>>>>> 6d970bc18af1d9a0633accee6ce73616ea54a980
	};

	const finalizeNonDisputedMarket = async () => {
		setIsLoading({...isLoading, loading: true})
		flux.finalize(data.id, null)
		.then(res => {
			setIsLoading({loading: false, err: false, res: "success"})
			getAndSetMarkets();
		})
		.catch(err => {
			console.error(err)
			setIsLoading({loading: false, err: false, res: "oops, something went wrong"})
		})
	}

	const actionSection = () => {
		if (!data.disputed) {
			return <button onClick={finalizeNonDisputedMarket}>Finalize</button>
		} else if (data.disputed && isOwner) {
			return <GovernanceAction
				onSubmit={handleFinalization} 
				actionName="Finalize" 
				data={data}
				setNewWinningOutcome={setNewWinningOutcome}
				newWinningOutcome={newWinningOutcome}
			/>
		} else {
			return <p>This disputed market will be finalized by the Judge</p>
		}
	}

	const closeLoader = () => {
		setIsLoading({...DEFAULT_STATE})
	}

	return (
		<Container>
			<Title>FINALIZABLE: {data.description}</Title>
			<CurrentOutcome>Last outcome: {outcomeToTag(data.winning_outcome, data.outcome_tags)}</CurrentOutcome>
			{ actionSection() }
			{(isLoading.loading || isLoading.res) && <StandardTXLoader res={isLoading.res} err={isLoading.err} closeLoader={closeLoader} />}
		</Container>
	)
}

export default Finalize