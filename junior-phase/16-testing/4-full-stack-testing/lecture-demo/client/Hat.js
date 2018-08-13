import React from 'react';

const Hat = props => (
  <div>
    <h3>{props.name}</h3>
    <img
      src={props.imageURL}
      height='100'
      width='100' />
  </div>
);

export default Hat;
