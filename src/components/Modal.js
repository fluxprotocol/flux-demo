import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const MoveUp = keyframes`
	from {
		bottom: -30vh;
	}
	to {
		bottom: 0;
	}
`;


const ModalContainer = styled.div`
	background-color: white;
	position: fixed;
	bottom: 0;
	height: 30vh;
	width: 90%;
	z-index: 102;
	animation: ${MoveUp} 500ms linear;
	padding: 0 5%;

`

const Blackground = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	animation: ${FadeIn} 500ms linear;
	left: 0;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 101;
`
function Modal({className, children, blackground, onBlackgroundClick}) {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'scroll';
		}
	}, [])


	return (
		<>
			{blackground && <Blackground onClick={onBlackgroundClick}/>}
			<ModalContainer className={className}>
				{children}
			</ModalContainer>
		</>
	);
}


export default Modal;
