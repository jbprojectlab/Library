import { expect } from "chai";
import { shallow } from "enzyme";
import React from "react";
import sinon from "sinon";
import AllPuppies from "../components/AllPuppies";
import { puppies } from "./testData";

describe("AllPuppies Component", () => {
  let pickPuppy = sinon.spy();
  let wrapper;
  let divs;
  beforeEach("set up wrapper", () => {
    wrapper = shallow(<AllPuppies puppies={puppies} pickPuppy={pickPuppy} />, {
      disableLifecycleMethods: true
    });
    divs = wrapper.find("div.puppylink");
  });

  it("renders DIVs with names of each puppy", () => {
    expect(divs).to.have.length(puppies.length);
    puppies.forEach(puppy => {
      const matchingDiv = divs.filterWhere(div => div.text() === puppy.name);
      expect(matchingDiv).to.exist;
    });
  });

  it("invokes `pickPuppy` with the correct ID when puppy is clicked", () => {
    puppies.forEach(puppy => {
      const matchingDiv = divs.filterWhere(div => div.text() === puppy.name);
      matchingDiv.simulate("click");
      expect(pickPuppy.calledWith(puppy.id)).to.be.true;
    });
  });
});
