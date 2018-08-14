## takeaways

**conceptual**

- What is automated testing?
- Why is it useful?
- What makes for a good test?
- Why are fakes useful?

**terminology**

- Test runner: library / tool that executes (runs) tests
- Test suite: the set of all of our automated tests
- Test spec: a single automated test
- Assertion: code in a test spec that asserts some result, that will trigger a pass or fail of the spec
- TDD: test-driven development, write each test first (one at a time)
- Unit test: a test for just one small part of the software, disconnected, isolated from other parts of the software (e.g. testing a function)
- Integration test: a test for combined units / modules, testing more than one piece of your software in conjuction with each other
- UI / end-to-end test: a test for top level user-facing behavior
- Test pyramid: a good test suite has many unit tests, fewer integration tests, and even fewer UI / end-to-end tests
- Fakes or doubles—e.g. spy, stub, mock: replaces an existing function / object, so that we can isolate testing thing A from testing thing B (which thing A uses)

**specific technical tools**

- mocha: a universal (frontend, backend, wherever) JS test runner library, so a command line tool, but also gives us `describe` and `it`
- async testing in mocha: if you need to test something asynchronous in your mocha tests, make sure to pass the `it` an `async` function and make sure to properly `await` any relevant promises inside it
- chai: a universal (frontend, backend, wherever) JS assertion library, gives us `expect`
- sinon: a universal (frontend, backend, wherever) JS fake / double library, gives us `sinon.spy`, `sinon.stub`
- supertest: a node JS library to make HTTP requests, is a "mock HTTP client", gives us e.g. `supertest(someExpressApp).get()`
- enzyme: a universal (frontend, backend, wherever) JS libary for testing react components without actually attaching them to a real DOM, gives us `shallow` render method
- mock axios adapter: a universal (frontend, backend, wherever) JS libary that helps us make a fake HTTP server that will respond to `axios` AJAX requests

## look at some examples

A component test:

```jsx
import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import sinon from "sinon";
import SinglePuppy from "../components/SinglePuppy";
import { puppy } from "./testData";

describe("SinglePuppy Component", () => {
  let wrapper;
  let listAll = sinon.spy();
  beforeEach("set up wrapper", () => {
    // we create an element called `wrapper` by "shallow" rendering `SinglePuppy`
    wrapper = shallow(<SinglePuppy puppy={puppy} listAll={listAll} />);
  });

  it("displays the puppy's name, age, and photo", () => {
    // we make assertions about the contents of `wrapper`, thus testing how `SinglePuppy` determines the UI
    const img = wrapper.find("img");
    expect(img.html()).to.include(puppy.image);
    const text = wrapper.text();
    expect(text).to.include(puppy.name);
    expect(text).to.include(puppy.age);
  });

  it("invokes `listAll` when `List all Puppies` button is clicked", () => {
    // we make an assertion that clicking `wrapper`'s button triggers the callback it received as a prop
    wrapper.find("button").simulate("click");
    expect(listAll.called).to.be.true;
  });
});
```

A route test:

```js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const Puppy = require('../db').models.puppy;

describe('Puppy routes', () => {
  // zeroing the puppy data in the database before any specs
  before('Synchronize the model', () => Puppy.sync({ force: true }));
  // before each spec we remove any data that was added to the puppy table
  beforeEach('Truncate data', () => Puppy.truncate());

  describe('GET /api/puppies', () => {
    it('responds with 200 and all puppies in the database', async () => {
      // creating some puppy data
      const pupCreations = [
        Puppy.create({ name: 'pup1'}),
        Puppy.create({ name: 'pup2'}),
        Puppy.create({ name: 'pup3'}),
      ];
      // properly awaiting the creation, and aftewards the request
      await Promise.all(pupCreations);
      const response = await request(app)
      .get('/api/puppies')
      .expect(200);
      // make an assertion about the response
      expect(response.body).to.have.lengthOf(pupCreations.length);
    });
  });

  // ...

});
```
