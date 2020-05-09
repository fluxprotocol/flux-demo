import React from 'react';
import Loader from './Spinner';
import styled from 'styled-components';
import { DARK_BLUE, PINK } from '../constants';
import ModalButton from './ModalButton';

const Modal = styled.div`
	width: 150px;
	height: 150px;
	position: fixed;
	background-color: white;
	left: calc(50% - 75px);
	top: calc(50vh - 75px);
	z-index: 101;
	border-radius: 18px;
`

const CustomBlackground = styled.div`
	z-index: 100;
	position: fixed;
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	background-color: black;
	opacity: 0.3;
`

const Response = styled.p`
	color: ${props => props.error ? "red" : DARK_BLUE};
	text-align: center;
	margin: auto;
	width: 90%;
	padding-top: 25px;
`

const CloseButton = styled(ModalButton)`
	font-size: 16px;
	padding: 12px;
	position: absolute; 
	left: 0;
	width: 100%;
	bottom: 0;
	border-radius: 0 0 18px 18px;
`

export const DEFAULT_STATE = {
	loading: false,
	res: null,
	err: null 
}

function StandardTXLoader({res, err, closeLoader}) {
	return (
		<>
			<CustomBlackground onClick={() => {
				if (res) closeLoader()
			}}/>
			<Modal>
				{!res ? <Loader/> :
				<>
					<Response error={err}>{res}</Response>
					<CloseButton onClick={closeLoader} color={err ? PINK : DARK_BLUE}>close</CloseButton>
				</>
				}
			</Modal>
		</>
	)
}

export default StandardTXLoader;