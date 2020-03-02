import React from 'react';
import styled from 'styled-components';

export default ({color, onClick ,children, className}) => {
	const StyledButton = styled.button`
		background-color: ${color};
		color: white;
		border-radius: 10px;
		font-size: 20px;
		font-weight: bold;
		width: 100%;
		margin-top: 18px;
		padding: 18px;
	`;
	return <StyledButton className={className} onClick={onClick}>{children}</StyledButton>
}