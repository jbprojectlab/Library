import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';

import Main from './components/Main';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('game')
);
