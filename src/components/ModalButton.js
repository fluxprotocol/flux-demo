import React from 'react';
import styled from 'styled-components';

	const StyledButton = styled.button`
		background-color: ${props => props.color};
		color: white;
		border-radius: 10px;
		font-size: 20px;
		font-weight: bold;
		width: 100%;
		margin-top: 18px;
		padding: 18px;
	`;
export default ({color, onClick ,children, className}) => {
	return <StyledButton color={color} className={className} onClick={onClick}>{children}</StyledButton>
}