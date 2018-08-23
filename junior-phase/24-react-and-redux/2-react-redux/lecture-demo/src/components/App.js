import React, { Component } from "react";
import store, { deposit, withdraw } from "../store";
import { Provider, connect } from 'react-redux';

const Bank = props => {
  return (
    <div>
      <header>
        <img src="logo.svg" width="150" alt="ReduxBank" />
        <br />{props.title}
      </header>
      <br />
      <h1 id="balance">$ {props.balance}</h1>
      <div className="atm">
        <button onClick={() => props.deposit(5)}>Deposit $5</button>
        <button onClick={() => props.deposit(25)}>Deposit $25</button>
        <button onClick={() => props.withdraw(5)}>Withdraw $5</button>
        <button onClick={() => props.withdraw(25)}>Withdraw $25</button>
      </div>
    </div>
  );
};

// a function that converts the store state to THE PROPS THE INNER COMPONENT NEEDS FROM THE STORE STATE, our data
const mapStateToProps = (storeState) => {
  return {
    balance: storeState.balance
  };
};

// a function that converts dispatch to THE PROPS THE INNER COMPONENT NEEDS (THAT RELY ON DISPATCH), our methods
const mapDispatchToProps = (dispatch) => {
  return {
    deposit: (amount) => {
      const depositAction = deposit(amount);
      dispatch(depositAction);
    },
    withdraw: (amount) => {
      const withdrawAction = withdraw(amount);
      dispatch(withdrawAction);
    }
  };
};

const ConnectedBank = connect(mapStateToProps, mapDispatchToProps)(Bank);

const App = () => (
  <Provider store={store}>
    <ConnectedBank title='Redux Bank!' />
  </Provider>
);

export default App;
