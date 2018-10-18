import React from 'react';
import {shallow} from 'enzyme';

import {PresentationalComponent as NewUserForm} from './NewUserForm';

test('`NewUserForm` has initial state `showForm` false', () => {
  const wrapper = shallow(<NewUserForm />);
  expect(wrapper.state('showForm')).toEqual(false);
});

test('`NewUserForm` has methods for setting `showForm` to true and false', () => {
  const wrapper = shallow(<NewUserForm />);
  wrapper.instance().startShowingForm();
  expect(wrapper.state('showForm')).toEqual(true);
  wrapper.instance().stopShowingForm();
  expect(wrapper.state('showForm')).toEqual(false);
});

test('`NewUserForm` will render a button that can toggle the `showForm` state properly', () => {
  const wrapper = shallow(<NewUserForm />);
  const instance = wrapper.instance();
  wrapper.setState({showForm: true});
  const stopButton = wrapper.find('button');
  expect(stopButton.length).toEqual(1);
  expect(stopButton.props().onClick).toEqual(instance.stopShowingForm);
  wrapper.setState({showForm: false});
  const startButton = wrapper.find('button');
  expect(startButton.length).toEqual(1);
  expect(startButton.props().onClick).toEqual(instance.startShowingForm);
});
