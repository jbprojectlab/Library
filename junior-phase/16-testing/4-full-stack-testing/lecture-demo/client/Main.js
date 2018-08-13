import React from 'react';
import axios from 'axios';

import HatList from './HatList';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hats: [],
    };
  }

  async componentDidMount() {
    const response = await axios.get('/api/hats');
    const hats = response.data;
    this.setState({ hats });
  }

  render() {
    return (
      <div>
        <h1>Hats we love:</h1>
        {this.state.hats.length ? (
          <HatList hats={this.state.hats} />
        ) : (
          <h2>Sorry, no hats yet :`(</h2>
        )}
      </div>
    );
  }
}

export default Main;
