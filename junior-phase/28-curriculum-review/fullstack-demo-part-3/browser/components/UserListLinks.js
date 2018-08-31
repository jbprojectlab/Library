import React from 'react';
import {Link} from 'react-router-dom';

const UserListLinks = (props) => (
  <div>
    {props.users.map(user => (
      <div key={user.id}>
        <Link to={`/people/${user.id}`}>
          {user.name}
        </Link>
      </div>
    ))}
  </div>
);

export default UserListLinks;
