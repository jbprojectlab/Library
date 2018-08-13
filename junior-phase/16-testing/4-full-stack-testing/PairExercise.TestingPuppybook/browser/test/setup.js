import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { newPuppy, puppies, puppy } from './testData';


/**
 * The enzyme adapter "adapts" its functions to the specific version of React
 * you are using (in our current case, react 16). This is necessary as breaking
 * changes in React's internal implementations (which enzyme utilizes) may be
 * introduced with each major version.
 */
Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * axios-mock-adapter is in charge of mocking API calls. Remember that a mock
 * is simply an object where all the methods are stubbed with fake (predictable)
 * responses! This way, we do not rely on an actual backend when we're just trying
 * to test that our frontend application works as it should.
 */
const mock = new AxiosMockAdapter(axios);
mock.onGet('/api/puppies').reply(200, puppies);
mock.onGet(`/api/puppies/${puppy.id}`).reply(200, puppy);
mock.onPost('/api/puppies').reply(201, newPuppy);
