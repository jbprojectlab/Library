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
    wrapper = shallow(<SinglePuppy puppy={puppy} listAll={listAll} />);
  });

  it("displays the puppy's name, age, and photo", () => {
    const img = wrapper.find("img");
    expect(img.html()).to.include(puppy.image);
    const text = wrapper.text();
    expect(text).to.include(puppy.name);
    expect(text).to.include(puppy.age);
  });

  it("invokes `listAll` when `List all Puppies` button is clicked", () => {
    wrapper.find("button").simulate("click");
    expect(listAll.called).to.be.true;
  });
});
