import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const StyledSpinner = styled(Spinner) `
	left: calc(50% - 32px);
	top: calc(50vh - 32px);
`;

function Loader() {
	return (
		<StyledSpinner />
	);

}


export default Loader;
