import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({
  adapter: new EnzymeAdapter()
});
import chai from 'chai';
const expect = chai.expect;
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
const mockServer = new AxiosMockAdapter(axios);

import Hat from '../client/Hat';
import HatList from '../client/HatList';
import Main from '../client/Main';

const sleep = milliseconds => new Promise((resolve) => {
  setTimeout(() => resolve(), milliseconds);
});

describe('Our Hat component', () => {

  it('renders the name of the hat in a header', () => {
    const hatElement = shallow(<Hat name='Bowler' />);
    expect(hatElement.find('h3').text()).to.equal('Bowler');
  });

});

describe('Our Main component', () => {

  it('renders `HatList` with the API data', async () => {
    const dummyData = [{name: 'Tophat'}];
    mockServer.onGet('/api/hats').reply(200, dummyData);
    const mainElement = shallow(<Main />);
    await sleep(10);
    const hatListElement = mainElement.find(HatList);
    expect(hatListElement).to.exist;
    expect(hatListElement.props().hats).to.deep.equal(dummyData);
  });

});
