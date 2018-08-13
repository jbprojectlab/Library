import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import AllPuppies from "../components/AllPuppies";
import Main from "../components/Main";
import SinglePuppy from "../components/SinglePuppy";
import { puppies, puppy } from "./testData";

describe("Main Component", () => {
  let wrapper;
  beforeEach("set up wrapper", () => {
    // shallow will call componentDidMount by default, which in our component
    // does a `setState`. We are disabling this because we want to control the
    // timing of setState more precisely in our own specs.
    wrapper = shallow(<Main />, { disableLifecycleMethods: true });
  });

  it("renders AllPuppies by default", () => {
    wrapper.setState({ puppies });
    expect(wrapper.find(AllPuppies)).to.have.length(1);
    expect(wrapper.find(SinglePuppy)).to.have.length(0);
  });

  it("renders SinglePuppy if there is a selected puppy", () => {
    wrapper.setState({ puppies, selectedPuppy: puppy });
    expect(wrapper.find(SinglePuppy)).to.have.length(1);
    expect(wrapper.find(AllPuppies)).to.have.length(0);
  });

  it("fetches puppies on didMount and sets results on state", async () => {
    // componentDidMount on AllPuppies is an async function, which means the
    // `setState` won't actually happen in the lifespan of this test spec unless
    // properly handled. This is why we manually trigger componentDidMount here,
    // `await`-ing its results to ensure expectations are made only after the
    // async method completes.
    await wrapper.instance().componentDidMount();

    // We expect state.puppies to be the test puppies, because that's what our
    // axios mock adapter respond with to GET /api/puppies (see setup.js)
    expect(wrapper.state().puppies).to.deep.equal(puppies);
  });

  it("has an pickPuppy method that adds a selected puppy to state", async () => {
    wrapper.setState({ puppies });
    // We expect state.selectedPuppy to be the test puppy, because that's what our
    // axios mock adapter respond with to GET /api/puppy/{puppy.id} (see setup.js)
    await wrapper.instance().pickPuppy(puppy.id)();
    expect(wrapper.state().selectedPuppy).to.deep.equal(puppy);
  });
});
