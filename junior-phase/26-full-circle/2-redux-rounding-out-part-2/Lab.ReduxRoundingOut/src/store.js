import { compose, combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import auth from './reducers/auth';
import rooms from './reducers/rooms';

const reducer = combineReducers({
  auth,
  rooms
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
  )
);

export default store;