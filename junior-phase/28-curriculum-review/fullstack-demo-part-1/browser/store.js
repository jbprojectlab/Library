import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(loggingMiddleware, thunkMiddleware)
);

export default store;
