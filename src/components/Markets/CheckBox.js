import React, { useState } from 'react';
import styled from 'styled-components';


const CheckBoxContainer = styled.div`
	display: inline-block;
	cursor: pointer;
`

function CheckBox({value, label, checked, toggleFilterOption}) {
	return (
		<CheckBoxContainer onClick={() => toggleFilterOption(value)}>
			<input 
				readOnly
				type="checkbox" 
				checked={checked} 
				value={value}
			/> {label}
		</CheckBoxContainer>
	)
}

export default CheckBox;