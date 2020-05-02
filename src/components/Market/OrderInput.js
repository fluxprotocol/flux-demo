import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DARK_BLUE } from '../../constants';

const Input = styled.input`
	border: 1px solid ${DARK_BLUE};
	border-radius: 10px;
	color: ${DARK_BLUE};
	box-shadow: none;
	font-size: 18px;
	font-weight: bold;
	text-align: right;
	max-width: 90px;
	padding: 7px 7px;
	font-weight: bold;
	z-index: 4;
`;

const Demonination = styled.span`
	font-size: 18px;
	color: ${DARK_BLUE};
	font-weight: bold;
	z-index: 5;
	position: absolute;
	left: 7px;
	top: 7px;

`;

const Container = styled.div`
	position: relative;
`

export default ({value, changeValue, denomination, focus}) => {
	let input = React.createRef();

	useEffect(() => {
		if (focus) input.focus();
	},[]);

	return (
		<Container>
			<Demonination>{denomination}</Demonination>
			<Input type="number" value={value} ref={ref => input = ref} onChange={e => changeValue(e.target.value)}/>
		</Container>
	);
}
