import axios from "axios";
import React, { Component } from "react";
import AllPuppies from "./AllPuppies";
import SinglePuppy from "./SinglePuppy";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      puppies: [],
      selectedPuppy: {}
    };
    this.pickPuppy = this.pickPuppy.bind(this);
    this.listAll = this.listAll.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get("/api/puppies");
    this.setState({
      puppies: data
    });
  }

  pickPuppy(puppyId) {
    return async () => {
      const { data } = await axios.get(`/api/puppies/${puppyId}`);
      this.setState({
        selectedPuppy: data
      });
    };
  }

  listAll() {
    this.setState({
      selectedPuppy: {}
    });
  }

  render() {
    return (
      <div className="main">
        <h1>Puppy Book</h1>
        <div className="container">
          {this.state.selectedPuppy.id ? (
            <SinglePuppy puppy={this.state.selectedPuppy} listAll={this.listAll} />
          ) : (
            <AllPuppies puppies={this.state.puppies} pickPuppy={this.pickPuppy} />
          )}
        </div>
      </div>
    );
  }
}

export default Main;
