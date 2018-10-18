import React from 'react';
import {shallow} from 'enzyme';

import {PresentationalComponent as AllUsers} from './AllUsers';
import UserListLinks from './UserListLinks';

test('`AllUsers` presentational component renders `UserListLinks`', () => {
  const wrapper = shallow(<AllUsers list={[]} loadUsers={() => {}} />);
  expect(wrapper.find(UserListLinks)).toHaveLength(1);
});
