import React from 'react';
import {shallow} from 'enzyme';
import {Link} from 'react-router-dom';

import UserListLinks from './UserListLinks';

test('`UserListLinks` component renders `Link`s based on the `users` data prop input', () => {
  const wrapper = shallow(<UserListLinks users={[{
    name: 'Omri Bernstein',
    id: 1
  }, {
    name: 'Gabriel Lebec',
    id: 2
  }, {
    name: 'Jessie De La Cruz Santos',
    id: 5
  }]} />);
  const allLinks = wrapper.find(Link);
  expect(allLinks).toHaveLength(3);
  const allLinkProps = allLinks.map(linkNode => linkNode.props());
  expect(allLinkProps.map(props => props.children)).toEqual([
    'Omri Bernstein', 'Gabriel Lebec', 'Jessie De La Cruz Santos'
  ]);
  expect(allLinkProps.map(props => props.to)).toEqual([
    '/people/1', '/people/2', '/people/5'
  ]);
});
