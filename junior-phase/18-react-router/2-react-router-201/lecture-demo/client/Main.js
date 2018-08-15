import React from 'react';
import {Route} from 'react-router-dom';

import ArtList from './ArtList';
import SingleArt from './SingleArt';

const Main = () => {
  return (
    <div>
      <Route
        exact
        path='/art'
        render={routeProps => (
          <ArtList headerColor='red' {...routeProps} />
        )} />
      <Route exact path='/art/:id' component={SingleArt} />
    </div>
  );
};

export default Main;
