import React from 'react';
import styled from 'styled-components';
import { Label } from './';
import { DARK_BLUE } from '../../constants';

const TextArea = styled.textarea`
	display: block;
	font-size: 14px;
	width: 90%;
	height: 40px;
	border: 1px solid ${DARK_BLUE};
	border-radius: 12px;
	padding: 5px;
` 
const Input = styled.input`
	border: 1px solid ${DARK_BLUE};
	display: block;
	font-size: 14px;
	width: 10%;
	border-radius: 12px;
	padding: 5px;
` 


const Group = styled.div`
	display: block;
	margin-bottom: 15px;
`

function InputGroup({value, type, setValue, label, placeholder}) {
	return (
		<Group>
			<Label>{label}</Label>
			{ type === "textarea" ? (
				<TextArea placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)}/>
			) : (
				<Input placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)}/>
			) }
		</Group>
	);
}

export default InputGroup;