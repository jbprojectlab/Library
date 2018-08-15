import React from 'react';
import axios from 'axios';

class SingleArt extends React.Component {
  constructor () {
    super();
    this.state = {
      singleArtData: {}
    };
  }
  async componentDidMount () {
    const response = await axios.get('/api/artwork/' + this.props.match.params.id);
    const singleArtData = response.data;
    this.setState({
      singleArtData
    });
  }
  render () {
    const {singleArtData} = this.state;
    return (
      <div>
        <h2>
          {singleArtData.title} (${(singleArtData.price / 100).toFixed(2)})
        </h2>
        <div>
          <img src={singleArtData.imageURL} height="100" width="100" />
        </div>
      </div>
    );
  }
}

export default SingleArt;
