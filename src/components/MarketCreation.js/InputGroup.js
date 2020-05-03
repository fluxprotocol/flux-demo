import React from 'react';
import styled from 'styled-components';
import { Label } from './';

const TextArea = styled.textarea`
	display: block;
	font-size: 14px;
	width: 90%;
	height: 40px;
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
			<TextArea placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)}/>
		</Group>
	);
}

export default InputGroup;