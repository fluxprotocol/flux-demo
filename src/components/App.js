import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getMarkets } from '../actions/marketsActions';
import Header from './Header';
import Markets from './Markets/Markets';
import OwnerPortal from './OwnerPortal';
import styled from 'styled-components';

const AppContainer = styled.div`


`

// TODO: send a notification if gas runs low, the user needs to login and out
function App({contract, dispatch, owner, accountId}) {
  useEffect(() => {
    if (contract) {
      dispatch(getMarkets(contract));
    } 
  });

  return (
    <AppContainer >
      {
        <>
          {/* {(owner && accountId) && owner === accountId && <OwnerPortal/> } */}
          <Header />
          <Markets />
        </>
      }
    </AppContainer>
  );
}

const mapStateToProps = (state) => ({
  contract: state.near.contract,
  owner: state.near.owner,
  accountId: state.account.accountId
});


export default connect(mapStateToProps)(App);
