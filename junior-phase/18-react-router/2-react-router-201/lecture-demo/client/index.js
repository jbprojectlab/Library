import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';

import Main from './Main';

const Root = () => {
  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
}

ReactDOM.render(
  <Root />,
  document.getElementById('app-root')
);
