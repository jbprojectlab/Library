import React, { Component } from "react";
import store, { deposit, withdraw } from "../store";

const Bank = props => {
  return (
    <div>
      <header>
        <img src="logo.svg" width="150" alt="ReduxBank" />
        <br />Redux Bank
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

class ConnectedBank extends Component {
  constructor () {
    super();
    this.state = {
      balance: store.getState().balance
    };
  }
  componentDidMount () {
    // update the local component state and re-render when the store state changes
    this.unsubscribe = store.subscribe(() => {
      const storeState = store.getState();
      this.setState({
        balance: storeState.balance
      });
    });
  }
  componentWillUnmount () {
    // stop listening for changes!
    this.unsubscribe();
  }
  render () {
    return (
      <Bank
        balance={this.state.balance}
        deposit={amount => {
          // trigger a change to the store (via dispatch)
          const depositAction = deposit(amount);
          store.dispatch(depositAction);
        }}
        withdraw={amount => {
          // trigger a change to the store (via dispatch)
          const withdrawAction = withdraw(amount);
          store.dispatch(withdrawAction);
        }} />
    );
  }
}

export default ConnectedBank;
