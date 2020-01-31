import React from 'react';
import styled from 'styled-components';

const Timer = styled.span`
  position: absolute;
  top: 10px;
  right: 5%;
  color: #310094;
`;

export default function CountDownTimer({ days, hours, minutes, seconds, completed }) {
	if (completed) {
	  return <Timer>Completed</Timer>;
	} else {
	  return <Timer>{days} days {hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes }:{seconds < 10 ? "0" + seconds : seconds}</Timer>;
	}
};