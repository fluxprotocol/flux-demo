import React, { useState } from 'react';
import styled from 'styled-components';
import { outcomeToTag} from '../../utils/unitConvertion';
import OutcomeButton from './OutcomeButton';

const Container = styled.div``
const ExtraInfo = styled.h3``
const ActionButton = styled.button``
const ActionSection = styled.form``
const Submit = styled.button``

function GovernanceAction({ data, actionName, onSubmit, setNewWinningOutcome, newWinningOutcome }) {
	const [actionActive, setactionActive] = useState(false);

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

	return (
		<Container>
			<ExtraInfo>Extra info: {data.extra_info}</ExtraInfo>
			{!actionActive && <ActionButton onClick={() => setactionActive(true)}>{actionName}</ActionButton>}
			{actionActive && (
				<>
					{outcomeButtons}
					<ActionSection onSubmit={onSubmit}>
						<Submit type="submit">{actionName}</Submit>
					</ActionSection>
				</>
			)}
		</Container>
	)
}

export default GovernanceAction