import React from 'react';
import styled from 'styled-components'
import { DARK_BLUE, PINK } from '../../constants';

const Button = styled.button`
		padding: 15px;
		background-color: ${props => props.isActive ? PINK : DARK_BLUE};
		border: none;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 600;
		margin: 10px 10px;
		color: white;
`

function OutcomeButton({children, setOutcome, isActive}) {
	return (
		<Button isActive={isActive} onClick={setOutcome}>{children}</Button>
	)
}

export default OutcomeButton