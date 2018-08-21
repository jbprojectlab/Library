import React from 'react';
import ReactDOM from 'react-dom';

const Page = (props) => (
  <div>
    <h2>{props.title}</h2>
    <div>
      {props.render()}
    </div>
  </div>
);

ReactDOM.render(
  <Page
    title='Welcome'
    render={() => {
      return <p>Welcome to our little shop</p>;
    }} />,
  document.getElementById('root')
);
