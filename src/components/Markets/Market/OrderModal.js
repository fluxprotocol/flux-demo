import React from 'react';
import styled from 'styled-components';
import Modal from './../../Modal';
import { connect } from 'react-redux';
import { getOrderModal } from '../../../actions/marketActions';
import { PINK, DARK_BLUE } from '../../../constants';

const CancelButton = styled.p`
	color: ${PINK};
	font-size: 18px;
	font-weight: lighter;
	text-decoration: underline;
	text-align: right;
`

const Row = styled.div`
	width: 100%;
	font-size: 18px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${DARK_BLUE};
`

const Value = styled.span`
	font-weight: bold;
`

function OrderModal({selectedMarket, selectedOutcome, dispatch}) {
	let outcome;
	if (selectedMarket) {
		const outcomeTagExists = !!selectedMarket.outcome_tags[selectedOutcome];
		outcome = outcomeTagExists ? selectedMarket.outcome_tags[selectedOutcome] : selectedOutcome === 0 ? "NO" : "YES";
	}
	return (
	 	selectedMarket && (
		 	<Modal blackground={true} onBlackgroundClick={() => dispatch(getOrderModal(null, null))}>
				 <CancelButton>cancel</CancelButton>
				 <Row>
					 <p>contract:</p>
					 <Value>{outcome}</Value>
				 </Row>
				 <Row>
					 <p>price:</p>
					 <Value>{outcome}</Value>
				 </Row>
				 <Row>
					 <p>contract:</p>
					 <Value>{outcome}</Value>
				 </Row>
			</Modal>
		)
	);

}


const mapStateToProps = (state) => ({
	selectedMarket: state.market.selectedMarket,
	selectedOutcome: state.market.selectedOutcome,

});
export default connect(mapStateToProps)(OrderModal);
