import { createStore } from "redux";

// action types
const WITHDRAW = 'withdraw';
const DEPOSIT = 'deposit';

// action creators
export const withdraw = (amount) => ({ type: WITHDRAW, amount });
export const deposit = (amount) => ({ type: DEPOSIT, amount });

const reducer = (state = { balance: 0 }, action) => {
  switch (action.type) {
    case DEPOSIT:
      return { balance: state.balance + action.amount }
    case WITHDRAW:
      return { balance: state.balance - action.amount }
    default:
      return state;
  }
}

const store = createStore(reducer)

export default store;
