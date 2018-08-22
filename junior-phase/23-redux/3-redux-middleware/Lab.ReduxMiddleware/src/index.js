import { createStore, applyMiddleware } from "redux";

const balance = document.getElementById("balance");
const deposit5 = document.getElementById("deposit5");
const deposit25 = document.getElementById("deposit25");
const withdraw5 = document.getElementById("withdraw5");
const withdraw25 = document.getElementById("withdraw25");

deposit5.onclick = () => store.dispatch({ type: "deposit", amount: 5 })
deposit25.onclick = () => store.dispatch({ type: "deposit", amount: 25 })
withdraw5.onclick = () => store.dispatch({ type: "withdraw", amount: 5 })
withdraw25.onclick = () => store.dispatch({ type: "withdraw", amount: 25 })

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const middleware = applyMiddleware(logger);

const store = createStore((state = { balance: 0 }, action) => {
  switch (action.type) {
    case "deposit":
      return { balance: state.balance + action.amount }
    case "withdraw":
      return { balance: state.balance - action.amount }
    default:
      return state;
  }
}, middleware)

const balanceField = document.getElementById("balance");
store.subscribe(() => {
  balanceField.innerText = `$ ${store.getState().balance}`
})