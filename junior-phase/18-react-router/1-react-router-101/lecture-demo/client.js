import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Link} from 'react-router-dom';

const DogList = () => {
  return (
    <ul>
      <li>Odie</li>
      <li>Jessie</li>
      <li>Jack</li>
    </ul>
  );
};

const CatList = () => {
  return (
    <ul>
      <li>Xerxes</li>
      <li>Adil</li>
      <li>Gittie</li>
    </ul>
  );
}

const Main = () => {
  return (
    <div>
      <h2>See the animals</h2>
      <p>
        <Link to='/dogs'>the dogs!</Link>
        <span>{'    '}</span>
        <Link to='/cats'>the cats!</Link>
      </p>
      <Route path='/dogs' component={DogList} />
      <Route path='/cats' component={CatList} />
    </div>
  );
};

const Root = () => {
  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
}

ReactDOM.render(
  <Root />,
  document.getElementById('main')
);
