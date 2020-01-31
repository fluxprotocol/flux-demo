import React from 'react';
import styled from 'styled-components';
import { allowanceToColor } from '../utils/unitConvertion';

const Allowance = styled.div`
  position: absolute;
  margin-top: 10px;
`;

const Indicator = styled.div`
	border-radius: 50%;
	width: 15px;
	height: 15px;
	display: inline-block;
	vertical-align: middle;
	margin-left: 5px;
`;
function AllowanceIndicator({allowance}) {
	const ColoredAllowanceIndicator = styled(Indicator)`
		background-color: ${allowanceToColor(allowance)};
	`;
	return (
		<Allowance >{`allowance:`} <ColoredAllowanceIndicator/> </Allowance>
	);
}


export default AllowanceIndicator;
