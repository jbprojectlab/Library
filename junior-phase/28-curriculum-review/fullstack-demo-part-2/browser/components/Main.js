import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter, Route, Switch} from 'react-router-dom';

import store from '../store';
import AllUsers from './AllUsers';
import SingleUser from './SingleUser';
import NotFound from './NotFound';

const Main = () => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/people' component={AllUsers} />
        <Route exact path='/people/:userId' component={SingleUser} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  </Provider>
);

export default Main;
