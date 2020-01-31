import React from 'react';
import Switch from "react-switch";
import styled from 'styled-components';
import { BLUE, PINK } from './../constants';

const OrderTypeSwitch = styled(Switch)`
  float: right;
`;

const OrderTypeToggleSection = styled.div`
  margin-bottom: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  padding-bottom: 12px;
`;

const Label = styled.div`
  vertical-align: middle;
  display: inline;
`;

const OrderTypeToggle = ({onChange, orderType}) => {

	return (
    <OrderTypeToggleSection>
      <Label>{ orderType === "limit" ? "Limit order" : "Market order"}</Label>
      <OrderTypeSwitch 
        checkedIcon={false} 
        uncheckedIcon={false}
        onColor={BLUE}
        offColor={PINK}
        onChange={onChange} 
        checked={orderType === "limit"} 
      />
    </OrderTypeToggleSection>
	)
}

export default OrderTypeToggle;