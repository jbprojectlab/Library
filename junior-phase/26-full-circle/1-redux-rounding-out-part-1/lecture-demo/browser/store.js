import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const START = 'START';
const DECREMENT_TIME = 'DECREMENT_TIME';
const INCREMENT_CURRENT_SCORE = 'INCREMENT_CURRENT_SCORE';
const RECEIVE_SCORES = 'RECEIVE_SCORES';
const RECEIVE_ONE_SCORE = 'RECEIVE_ONE_SCORE';
const RESET_CURRENT_SCORE = 'RESET_CURRENT_SCORE'

export const start = () => ({
  type: START
});

export const decrementTime = () => ({
  type: DECREMENT_TIME
});

export const incrementCurrentScore = () => ({
  type: INCREMENT_CURRENT_SCORE
});

export const resetCurrentScore = () => ({
  type: RESET_CURRENT_SCORE
});

const receiveScores = scores => ({
  type: RECEIVE_SCORES,
  scores
});

export const fetchScores = () => {
  return async dispatch => {
    const {data: scores} = await axios.get('/api/scores');
    dispatch(receiveScores(scores));
  };
};

const receiveOneScore = score => ({
  type: RECEIVE_ONE_SCORE,
  score
});

export const submitScore = () => {
  return async (dispatch, getState) => {
    const score = {
      amount: getState().currentScore
    };
    await axios.post('/api/scores', score);
    dispatch(receiveOneScore(score));
  };
};

// separate "sub-reducer" for each key on our "root" reducer: one reducer to handle the value for each key on state
const timeRemainingReducer = (timeRemainingState = 0, action) => {
  // receives ONLY the `.timeRemaining` key from state
  switch (action.type) {
    case START:
      return 5;
    case DECREMENT_TIME:
      // returns ONLY the new value for the `.timeRemaining` key on state
      return timeRemainingState - 1;
    default:
      return timeRemainingState;
  }
};
const currentScoreReducer = (currentScoreState = 0, action) => {
  switch (action.type) {
    case START:
      return 0;
    case INCREMENT_CURRENT_SCORE:
      return currentScoreState + 1;
    case RESET_CURRENT_SCORE:
      return 0;
    default:
      return currentScoreState;
  }
};
const scoresReducer = (scoresState = [], action) => {
  switch (action.type) {
    case RECEIVE_SCORES:
      return action.scores;
    case RECEIVE_ONE_SCORE:
      return [...scoresState, action.score];
    default:
      return scoresState;
  }
};

const rootReducer = combineReducers({
  // there is a key on state called `timeRemaining` and its value will be managed by the `timeRemainingReducer`
  timeRemaining: timeRemainingReducer,
  // there is a key on state called `currentScore` and its value will be managed by the `currentScoreReducer`
  currentScore: currentScoreReducer,
  // there is a key on state called `scores` and its value will be managed by the `scoresReducer`
  scores: scoresReducer
});

// const initialState = {
//   timeRemaining: 0,
//   currentScore: 0,
//   scores: []
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case START:
//       return {
//         ...state,
//         timeRemaining: 5,
//         currentScore: 0
//       };
//     case DECREMENT_TIME:
//       return {
//         ...state,
//         timeRemaining: state.timeRemaining - 1
//       };
//     case INCREMENT_CURRENT_SCORE:
//       return {
//         ...state,
//         currentScore: state.currentScore + 1
//       };
//     case RECEIVE_SCORES:
//       return {
//         ...state,
//         scores: action.scores
//       };
//     case RECEIVE_ONE_SCORE:
//       return {
//         ...state,
//         scores: [...state.scores, action.score]
//       };
//     case RESET_CURRENT_SCORE:
//       return {
//         ...state,
//         currentScore: 0
//       };
//     default:
//       return state;
//   }
// };

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
