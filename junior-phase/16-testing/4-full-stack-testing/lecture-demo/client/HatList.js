import React from 'react';

import Hat from './Hat';

const HatList = props => (
  <ul>
    {props.hats.map(hat => (
      <Hat
        key={hat.id}
        name={hat.name}
        imageURL={hat.imageURL} />
    ))}
  </ul>
);

export default HatList;
