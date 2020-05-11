import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FluxContext } from '../FluxProvider';
import { dollarsToDai } from '../../utils/unitConvertion';
import GovernanceAction from './GovernanceAction';
import StandardTXLoader, { DEFAULT_STATE } from '../StandardTxLoader';

const Container = styled.div`
`

const Title = styled.h1``

function Resolute({ data, getAndSetMarkets }) {
	const [{flux}, dispatch] = useContext(FluxContext)
	const [newWinningOutcome, setNewWinningOutcome] = useState(false);
	const [isloading, setIsLoading] = useState(DEFAULT_STATE);

	const handleResolute = async (e) => {
		e.preventDefault();
		
		setIsLoading({loading: true, res: null, err: null});
		
		flux.resolute(data.id, newWinningOutcome, dollarsToDai(5))
		.then(async res => {
			// setIsLoading({ loading: false, res: "success", err: false })
			getAndSetMarkets();
			const updatedBalance = await flux.getFDaiBalance().catch(err => console.error(err));
			dispatch({type: "balanceUpdate", payload: {balance: updatedBalance}});
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
			<Title>RESOLUTABLE: {data.description}</Title>
			<GovernanceAction  
				data={data} 
				actionName="resolute" 
				onSubmit={handleResolute}
				newWinningOutcome={newWinningOutcome}
				setNewWinningOutcome={setNewWinningOutcome}
			/>
			{(isloading.loading || isloading.res) && <StandardTXLoader res={isloading.res} err={isloading.err} closeLoader={closeLoader} />}
		</Container>
	)
}

export default Resolute