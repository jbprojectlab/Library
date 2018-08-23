## Immutable `Map`s

Sort of like objects—stores key value pairs—but immutable AND can have keys that are themselves objects.

```js
const obj1 = {name: 'Jessie'};
const obj2 = {name: 'Jack'};
const startMap = new Map();
/*
startMap...
Map {}
*/
const mapWithJessie = startMap.set(obj1, 'Likes UA');
/*
mapWithJessie...
Map {
  {name: 'Jessie'}: 'Likes UA'
}
*/
const mapWithJessieAndJack = mapWithJessie.set(obj2, 'Takes longest baths in NY state');
/*
mapWithJessieAndJack...
Map {
  {name: 'Jessie'}: 'Likes UA',
  {name: 'Jack'}: 'Takes longest baths in NY state'
}
*/
mapWithJessieAndJack.get(obj1); // 'Likes UA'
mapWithJessieAndJack.get(obj2); // 'Takes longest baths in NY state'
```

- `.get`: a way to access the value of a key in the map
- `.set`: a way to set the value of a key in the map
- `.has`: a way to check for the existence of a key in the map

This is neat because it gives us immutability (predictability) and also gives us the ability to store information "about" objects. And it can do "nested" key operations:

- `.getIn`: a way to access a nested value of a "key path" in the map
- `.setIn`: a way to set a nested value of a "key path" in the map
- `.hasIn`: a way to check for the existence of a "key path" in the map

For example:

```js
const exampleMap = new Map()
.setIn(['a', 'b'], 5)
.setIn(['a', 'c'], 10)
.setIn(['x', 'y'], 100);
/*
exampleMap...
Map {
  a: Map {
    b: 5,
    c: 10
  },
  x: Map {
    y: 100
  }
}
*/
```

## XOXO flow

Below is commented code:

```js
import inquirer from 'inquirer';

import gameReducer, {move} from './game';
import {createStore} from 'redux';

// displays the board in the terminal window
const printBoard = () => {
  const {board} = game.getState();
  for (let r = 0; r != 3; ++r) {
    for (let c = 0; c != 3; ++c) {
      process.stdout.write(board.getIn([r, c], '_'));
    }
    process.stdout.write('\n');
  }
};

// displays an error in the terminal (if there is one)
const printError = () => {
  const {error} = game.getState();
  if (error) console.error(error);
};

// prompts the user and pauses until they respond
const getInput = player => async () => {
  const {turn} = game.getState();
  if (turn !== player) return;
  // we use inquirer to send a prompt to the user via the terminal
  const ans = await inquirer.prompt([{
    type: 'input',
    name: 'coord',
    message: `${turn}'s move (row,col):`
  }]);
  // parse the string the user typed to get the actual number coordinates from it
  const [row=0, col=0] = ans.coord.split(/[,\s+]/).map(x => +x);
  // sends an action to the reducer, updates the store state, calls all the subscribed listeners
  game.dispatch(move(turn, [row, col]));
};

// kills the terminal process once there is a winner
const exitOnWin = () => {
  const {winner} = game.getState();
  if (winner) {
    console.log(winner, 'wins!');
    process.exit(0);
  }
};

import play from './game/ai';

// makes an automatic move (based on our ai strategy)
const ai = player => () => {
  const state = game.getState();
  if (state.turn !== player) return;
  if (state.winner) return;
  const move = play(game.getState());
  console.log(`🤖 ${player} moves to ${move.coord}`);
  game.dispatch(move);
};

const game = createStore(gameReducer);

// ALL of the following functions will be invoked whenever the redux store state changes!
// when the state changes, call `printBoard`
game.subscribe(printBoard);
// " ... " `printError`
game.subscribe(printError);
// " ... " `getInput('X')`
game.subscribe(getInput('X'));
// " ... " `ai('O')`
game.subscribe(ai('O'));
// " ... " `exitOnWin`
game.subscribe(exitOnWin);

// sends an action to our reducer, redux internally updates the state, then fires all the subsribe listeners
game.dispatch({ type: 'START' });
```

## redux takeaways

- What is redux?
- What is a reducer?
- Redux store methods: `getState`, `dispatch`, `subscribe`
- How does state get updated in redux?
- Redux methods: `createStore`, `applyMiddleware`
