import React, { useState, useEffect } from 'react';
import '@material/react-text-field/dist/text-field.min.css';
import Countdown from 'react-countdown-now';
import CountdownTimer from './CountdownTimer.js';
import OrderOverview from './OrderOverview';
import OrderTypeToggle from './OrderTypeToggle';
import MarketInput from './MarketInput';
import MarketButton from './MarketButton';
import styled from 'styled-components';
import { BLUE, PINK } from '../constants';
import { fromPayoutDistribution, daiToDollars } from '../utils/unitConvertion';
import { capitalize } from '../utils/stringManipulation';
import { connect } from 'react-redux';
import { placeOrder, claimEarnings } from '../actions/marketActions';
import { updateBalance } from '../actions/nearActions.js';
import AllowanceIndicator from './AllowanceIndicator.js';
import Loader from './Loader.js';

const MarketContainer = styled.div`
  width: 90%;
  height: 100%;
  padding: 0 5%;
  position: relative;
  display: block;
  background-color: white;
  border-radius: 8px;
  box-sizing: border-box;
  -webkit-box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  -moz-box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  margin-left: 5%;

	@media (min-width: 560px) {
		overflow: auto;
		margin-bottom: 25px; 
	}

`;

const ButtonSection = styled.div`
  width: 88%;
  position: absolute;
  bottom: 5%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Description = styled.h1`
	color: #310094;
	padding: 45px 30px;
	display: block;
	margin: 0 auto;
`


const ResolutedSection = styled.div`
	display: block;
	width: 100%;
`;
const ResolutionTitle = styled.h2`
	text-align: center;
`;
const Resolution = styled.span`
	color: ${BLUE};
	width: 100%;
	text-align: center;
`;

// TODO: should make this components that are importable since this style is also used in auth
const ClaimButton = styled.button`
	background-color: ${BLUE};
	color: white;
	font-family: "Gilroy";
	border-radius: 6px;
	padding: 15px;
	font-size: 16px;
	border: none;
	box-sizing: border-box;
  -webkit-box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  -moz-box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
  box-shadow: 0 2px 4px 0 rgb(171, 190, 200);
	position: absolute;
	width: 80%;
	left: 10%;
	bottom: 25px;
`;

// TODO: This could be compartmentalized a lot more.
// TODO: If place order fails the loader Doesn't stop - should return error
function Market({market, marketLoading, accountData, dispatch, contract}) {
	let lastElement;
	const [updatedMarket, setUpdatedMarket] = useState(market);
	const [orderType, setOrderType] = useState("market")
	const [spend, setSpend] = useState(0);
	const [odds, setOdds] = useState(50);
	const [marketNoOrder, setNoMarketOrder]  = useState(null);
	const [marketYesOrder, setYesMarketOrder]  = useState(null);
	const [earnings, setEarnings]  = useState(0);
	const [userOrders, setUserOrders] = useState(null);

	market = updatedMarket;

	useEffect(() => {
		let unmounted = false;
		if (!market.resoluted) {
			const marketNoOrder = market.orderbooks[0] ? market.orderbooks[0].market_order : null;
			const marketYesOrder = market.orderbooks[1] ? market.orderbooks[1].market_order : null;

			if (userOrders === null) {
				market.getUserOrders(contract, accountData.accountId).then(orders => {
					if (!unmounted) {
						setUserOrders(orders);
					}
				});
			}

			setNoMarketOrder(marketNoOrder);
			setYesMarketOrder(marketYesOrder);
		} else {
			contract.get_earnings({market_id: market.id, from: accountData.accountId}).then((claimable) => {
				if (!unmounted) {
					setEarnings(daiToDollars(claimable));
				}
			});
		}
		return () => { unmounted = true }
	})

	const getAndUpdateUserOrders = () => {
		market.getUserOrders(contract, accountData.accountId).then(orders => {
			setUserOrders(orders);
		});
	}

	const updateUserBalance = () => {
		dispatch(updateBalance(contract, accountData.accountId));
	}

	const toggleOrderType = () => {
		setOrderType(orderType == "market" ? "limit" : "market");
	}
	
	const updateMarket = () => {
		market.updateMarket(contract).then( res => {
			setUpdatedMarket(res);
		});
	}

	const onInputChange = (field, value) => {
		if (field == "spend") setSpend(value);
		else if (field == "odds") setOdds(value);
	}

	const ifLastElemIsInputBlur = () => {
    const { type } = lastElement ? lastElement : "";
    if (type === "text") {
      lastElement.blur();
    }
    lastElement = document.activeElement;
	}

	const toEarnings = (outcome) => {
		if (orderType === "market") {
			if (outcome === 0 && marketNoOrder) {
				return (spend / (100 - marketNoOrder.price) * 100 ).toFixed(2);
			} else if(outcome === 1 && marketYesOrder) {
				return (spend / (100 - marketYesOrder.price) * 100 ).toFixed(2);
			} else {
				return "0.00";
			}
		} else {
			return (spend / (odds / 100)).toFixed(2)
		}
	}

	const order = {
		spend,
		odds
	}

	console.log(marketLoading, market.id)

	return (
		<MarketContainer onClick={ifLastElemIsInputBlur}>
			{marketLoading === market.id && <Loader />}
			<AllowanceIndicator allowance={accountData.allowance}/>
			<Description>{ capitalize(market.description) }?</Description>
			{
				!market.resoluted ? 
				<>
					<OrderTypeToggle
						onChange={toggleOrderType}
						orderType={orderType}
					/>
					<MarketInput 
					label = "spend"
					onChange = {onInputChange}
					value = {spend}
					/>
            {
							orderType === "limit" && (
								<MarketInput 
									label = "odds"
									onChange = {onInputChange}
									value = {odds}
                />
              )
            }

					<Countdown
						zeroPadTime={2}
						date={market.end_time}
						renderer={CountdownTimer}
					/>


					<OrderOverview marketId={market.id} userOrders={userOrders}/>

					<ButtonSection>
						<MarketButton 
							theme={PINK}
							marketId={market.id}
							earnings={toEarnings(1)}
							marketOrder = {marketYesOrder}
							orderType={orderType}
							odds={odds}
							label="no"
							placeOrder={(finalPrice) => {
								order.odds = finalPrice
								dispatch(placeOrder(accountData.account, market.id, 0, order, updateMarket, getAndUpdateUserOrders, updateUserBalance))
							}}
							/>

						<MarketButton 
							theme={BLUE}
							marketId={market.id}
							earnings={toEarnings(0)}
							marketOrder = {marketNoOrder}
							orderType={orderType}
							odds={odds}
							label="yes"
							placeOrder={(finalPrice) => {
								order.odds = finalPrice
								dispatch(placeOrder(accountData.account, market.id, 1, order, updateMarket, getAndUpdateUserOrders, updateUserBalance))
							}}
						/>
					</ButtonSection>
				</>
				:
				<ResolutedSection>
					<ResolutionTitle>
						Resoluted: <Resolution>{fromPayoutDistribution(market.payout_multipliers).toUpperCase()}</Resolution>
					</ResolutionTitle>

					<ClaimButton onClick={() => {
						dispatch(claimEarnings(accountData.account, market.id, updateUserBalance))
					}}>Claim ${earnings}</ClaimButton> 
				</ResolutedSection>
			}
		</MarketContainer>
	)
}


const mapStateToProps = (state) => ({
	accountData: state.account,
	orderType: state.market.orderType,
	contract: state.near.contract,
	txLoading: state.market.loading,
	marketLoading: state.market.marketLoading,
	contract: state.near.contract
})

export default connect(mapStateToProps)(Market);
