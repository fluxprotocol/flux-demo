import React from 'react';
import styled from 'styled-components';

const Blackground = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 101;
`
function Modal({className, children, width, height, blackground, onBlackgroundClick}) {

	const ModalContainer = styled.div`
		background-color: white;
		width: ${width};
		position: absolute;
		left: calc(50% - ${width} / 2 - 16px);
		top: calc(50% - ${height} / 2 - 16px);
		border-radius: 6px;
		padding: 16px;
		height: ${height};
		z-index: 102;
		-webkit-box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  	-moz-box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  	box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
	`
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
