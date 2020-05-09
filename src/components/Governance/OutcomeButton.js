import React from 'react';
import styled from 'styled-components'

const Button = styled.button`
	background-color: ${props => props.isActive ? "red": "transparent"};
`

function OutcomeButton({children, setOutcome, isActive}) {
	return (
		<Button isActive={isActive} onClick={setOutcome}>{children}</Button>
	)
}

export default OutcomeButton