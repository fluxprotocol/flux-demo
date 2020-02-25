import React from 'react';
import TextField, {Input} from '@material/react-text-field';


const MarketInput = ({label, onChange, value, leadingIcon}) => {
	return (	
		<TextField 
			className="material-input"
			label={label}
			margin="normal"
			leadingIcon={leadingIcon}
		>
			<Input  
				onClick={e => e.target.focus()}
				onChange={e => onChange(label, e.target.value)}
				value={value}
			/>
		</TextField>
	);
}

export default MarketInput;