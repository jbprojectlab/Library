import { createStore } from "redux";

const DEPOSIT = "deposit";
const WITHDRAW = "withdraw";

export const deposit = (amount) => ({ type: DEPOSIT, amount });
export const withdraw = (amount) => ({ type: WITHDRAW, amount });

const store = createStore((state = { balance: 0 }, action) => {
  switch (action.type) {
    case DEPOSIT:
      return { balance: state.balance + action.amount }
    case WITHDRAW:
      return { balance: state.balance - action.amount }
    default:
      return state;
  }
});

export default store;
