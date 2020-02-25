import React from 'react';
import styled from 'styled-components';
import { PINK, O_PINK } from './../constants';

const Switch = styled.div`
	display: block;
	width: 60%;
	margin: 0 auto;
	margin-top: 1%;
	padding: 0;
	border-radius: 6px;
	overflow: hidden;
`
const SwitchButton = styled.div`
	width: 50%;
	display: inline-block;
	text-align: center;
	padding: 5px 0;
	color: white;
	font-family: "Gilroy";
`


function OrderViewSwitch({toggle, activeView}) {
	const text = ["OPEN", "FILLED"];

	const buttons = text.map((text, i) => {
		const ColloredSwitchButton = styled(SwitchButton)`
			background-color: ${text === activeView ? PINK : O_PINK};
		`;
		return (
			<ColloredSwitchButton key={i}>{text}</ColloredSwitchButton>
		)
	})
	return (
		<Switch onClick={toggle}>
			{buttons}
		</Switch>
	);
}


export default OrderViewSwitch;
