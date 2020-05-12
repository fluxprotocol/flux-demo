import React, { useState } from 'react';
import styled from 'styled-components';
import OutcomeButton from './OutcomeButton';
import { DARK_BLUE, PINK } from '../../constants';

const Container = styled.div``
const ExtraInfo = styled.h3``
const ActionButton = styled.button``
const ActionSection = styled.form``
const Submit = styled.button`
	display: block;
	margin: auto;
	margin-top: 16px;
	padding: 15px;
	background-color: ${PINK};
	border: 2px solid ${PINK};
	border-radius: 6px;
	font-size: 14px;
	font-weight: 600;
	color: white;
`

const OutcomeButtonContainer = styled.div`
	display: flex;

	justify-content: center;
	flex-wrap: wrap;
`

function GovernanceAction({ data, actionName, onSubmit, setNewWinningOutcome, newWinningOutcome }) {
	const [actionActive, setActionActive] = useState(true);

	let outcomeButtons = [];
	if (data.outcomes === 2) {
		outcomeButtons = [
			<OutcomeButton key={0} isActive={0 === newWinningOutcome} setOutcome={() => setNewWinningOutcome(0)}>NO</OutcomeButton>,
			<OutcomeButton key={1} isActive={1 === newWinningOutcome} setOutcome={() => setNewWinningOutcome(1)}>YES</OutcomeButton>,
			<OutcomeButton key={2} isActive={null === newWinningOutcome} setOutcome={() => setNewWinningOutcome(null)}>INVALID</OutcomeButton>
		]
	} else {
		for (let i = 0; i <= data.outcomes; i++) {
			if (i === data.outcomes) {
				outcomeButtons.push(<OutcomeButton key={i} isActive={null  === newWinningOutcome} setOutcome={() => setNewWinningOutcome(null)}>Invalid</OutcomeButton>,)
			} else {
				outcomeButtons.push(<OutcomeButton key={i} isActive={i === newWinningOutcome} setOutcome={() => setNewWinningOutcome(i)}>{data.outcome_tags[i]}</OutcomeButton>,)
			}
		}
	}

	const stakeMessage = actionName === "resolute" ? "(stake $5)" : actionName === "dispute" ? "(stake $10)" : ""

	return (
		<Container>
			<ExtraInfo>Extra info: market id: {data.id} {data.extra_info}</ExtraInfo>
			{!actionActive && <ActionButton onClick={() => setActionActive(true)}>{actionName}</ActionButton>}
			{actionActive && (
				<>
					<OutcomeButtonContainer>
						{outcomeButtons}
					</OutcomeButtonContainer>
					<ActionSection onSubmit={onSubmit}>
						<Submit type="submit">{actionName} {stakeMessage}</Submit>
					</ActionSection>
				</>
			)}
		</Container>
	)
}

export default GovernanceAction