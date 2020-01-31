import React from 'react';
import TextField, {Input} from '@material/react-text-field';


const MarketInput = ({label, onChange, value}) => {
	return (	
		<TextField 
			className="material-input"
			label={label}
			margin="normal"
			leadingIcon={(<div>$</div>)}
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