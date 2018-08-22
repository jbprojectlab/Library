import store, {withdraw, deposit} from './store';

const balance = document.getElementById("balance");
const deposit5 = document.getElementById("deposit5");
const deposit25 = document.getElementById("deposit25");
const withdraw5 = document.getElementById("withdraw5");
const withdraw25 = document.getElementById("withdraw25");

deposit5.onclick = () => store.dispatch(deposit(5))
deposit25.onclick = () => store.dispatch(deposit(25))
withdraw5.onclick = () => store.dispatch(withdraw(5))
withdraw25.onclick = () => store.dispatch(withdraw(25))

const balanceField = document.getElementById("balance");
store.subscribe(() => {
  console.log("The store state changed. Here is the new state:", store.getState());
  balanceField.innerText = `$ ${store.getState().balance}`
})