import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getMarkets } from '../actions/marketsActions';
import Header from './Header';
import Markets from './Markets';
import LoadingScreen from './LoadingScreen';
import OwnerPortal from './OwnerPortal';
import styled from 'styled-components';

const AppContainer = styled.div`


`


function App({contract, dispatch, loading, owner, accountId}) {
  useEffect(() => {
    if (contract) {
      dispatch(getMarkets(contract));
    } 
  });

  return (
    <AppContainer >
      {
        loading 
        ?
        <LoadingScreen />
        :
        <>
          {(owner && accountId) && owner === accountId && <OwnerPortal/> }
          <Header />
          <Markets />
        </>
      }
    </AppContainer>
  );
}

const mapStateToProps = (state) => ({
  contract: state.near.contract,
  loading: state.near.loading,
  owner: state.near.owner,
  accountId: state.account.accountId
});


export default connect(mapStateToProps)(App);
