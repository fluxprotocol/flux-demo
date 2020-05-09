import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FluxContext } from '../FluxProvider';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import InputGroup from './InputGroup';
import MarketDummy from './MarketDummy';
import { DARK_BLUE } from '../../constants';
import Spinner from './../Spinner';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
	padding: 0 5%;
	padding-top: 125px;
`

const CreationForm = styled.form`
	width: 50%;
	display: inline-block;
	vertical-align: top;

	@media (max-width: 700px) {
		width: 100%;
	}
`

const Error = styled.p`
	color: red;
	font-size: 12px;
	text-align: center;
`

const StyledSpinner = styled(Spinner)`
	position: relative;
	display: block;
	margin: auto;
	transform: scale(0.4);
	left: auto;
	top: 0;
	height: 60px;
`

const SubmitButton = styled.button`
	width: 90%;
	margin-top: 40px;
	background-color: ${(props) => props.isLoading ? 'grey' : DARK_BLUE};
	border-radius: 6px;
	padding: ${(props) => props.isLoading ? '0' : "10px 15px"};
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	-webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	-moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	color: white;
	text-align: center;
	font-size: 18px;
	font-weight: 600;
	@media (min-width: 560px) {
		padding: ${(props) => props.isLoading ? '0' : "15px 25px}"};
	}
	&:active {
		box-shadow: none;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
	}
`

export const Label = styled.label`
	color: ${DARK_BLUE};
	font-size: 22px;
	font-weight: 600;
	margin-bottom: 7px;
	display: block;
`

const OutcomeInput = styled.input`
	display: block;
`

const Radio = styled.input`
	margin-bottom: 20px;
`


// TODO: Add loader
function MarketCreation () {
	const history = useHistory();
	const [{flux}, dispatch] = useContext(FluxContext);
	const [description, setDescription] = useState("");
	const [extraInfo, setExtraInfo] = useState("");
	const [endTime, setEndTime] = useState("");
	const [marketType, setMarketType] = useState("binary");
	const [outcomes, setOutcomes] = useState(2);
	const [outcomeTags, setOutcomeTags] = useState([]);
	const [categories, setCategories] = useState("");
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		if (description.length === 0) return setError("Please enter a description")
		if (outcomes < 2 || outcomes > 20) return setError("Please enter a valid amount of outcomes")
		if (outcomes != 2 && outcomes > outcomeTags.length) return setError("Please enter a tag for each outcome")
		if (endTime.length === 0) return setError("Please enter an end time")
		if (endTime.getTime() <= new Date().getTime()) return setError("Please a end time that's in the future")
		let outcomeTagCopy = outcomeTags;
		if (outcomes == 2) outcomeTagCopy = [];
		let categoryCopy = categories;
		categoryCopy.replace(",", '');
		const categoryArr = categoryCopy.split(" ");

		setLoading(true);
		try {
			const txRes = await flux.createMarket(description, extraInfo, parseInt(outcomes), outcomeTags, categoryArr, endTime.getTime(), 0);
			history.push(`/market/${atob(txRes.status.SuccessValue)}`)
		} catch (err) {
			setError(err)
		}
		setLoading(false);
	}

	const setOutcomeTag = (value, i) => {
		let updatedTags = [...outcomeTags];
		updatedTags[i] = value;
		setOutcomeTags(updatedTags);
	}

	let outcomeInputs = [];

	if (outcomes > 2) {
		for (let i = 0; i < outcomes; i++) {
			outcomeInputs.push(
				<OutcomeInput type="text" key={i} value={outcomeTags[i]} onChange={e => setOutcomeTag(e.target.value, i)}/>
			)
		}
	}
	return (
		<Container>

			<CreationForm onSubmit={handleSubmit}>
				<InputGroup 
					label="Market description:"
					value={description}
					placeholder="Will x happen by ?"
					type="textarea"
					setValue={setDescription}
				/>
				<InputGroup 
					label="Extra info:"
					type="textarea"
					value={extraInfo}
					placeholder="sources, etc."
					setValue={setExtraInfo}
				/>
				<InputGroup
					type="textarea"
					label="Market categories:"
					placeholder="comma seperated: sports, politics"
					value={categories}
					setValue={setCategories}
				/>

				<Label>Market Type: </Label>
				<Radio
					type="radio"
					value="binary"
					checked={marketType === "binary"}
					onChange={e => {
						setOutcomes(2)
						setMarketType("binary")
					}}
				/> binary (Yes | No)

				<Radio
					type="radio"
					value="categorical"
					checked={marketType === "categorical"}
					onChange={e => {
						setMarketType("categorical")
					}}
				/> Categorical
	
				{marketType === "categorical" && <InputGroup 
					label="Number of possible outcomes (max. 20):"
					value={outcomes}
					placeholder="number between 3 - 20"
					setValue={setOutcomes}
				/>}

				{marketType === "categorical" && outcomeInputs}
				{
					outcomes !== "" && <>
						<Label>End time: </Label>
						<DatePicker
							placeholderText="end time"
							selected={endTime} 
							onChange={date => setEndTime(date)}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={1}
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm aa"
						/>
					</>
				}

				<SubmitButton isLoading={loading} disabled={loading} type="submit">{ !loading ? "create market" : <StyledSpinner/> }</SubmitButton>
				<Error>{error}</Error>
			</CreationForm>
			<MarketDummy 
				description={description}
				outcomes={outcomes}
				outcomeTags={outcomeTags}
			/>
		</Container>
	)
}

export default MarketCreation