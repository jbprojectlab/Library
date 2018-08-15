import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const getRandomElement = (arr) => {
  const randIdx = Math.floor(Math.random() * arr.length);
  return arr[randIdx];
}

class ArtList extends React.Component {
  constructor () {
    super();
    this.state = {
      list: []
    };
  }
  async componentDidMount () {
    const response = await axios.get('/api/artwork');
    const list = response.data;
    this.setState({
      list
    });
  }
  render () {
    return (
      <div>
        <h2 className={this.props.headerColor}>Browse our collection</h2>
        <button onClick={() => {
          const artInfo = getRandomElement(this.state.list);
          this.props.history.push('/art/' + artInfo.id);
        }}>
          Goto random artwork
        </button>
        {this.state.list.map(artInfo => {
          return (
            <div key={artInfo.id}>
              <Link to={'/art/' + artInfo.id}>{artInfo.title}</Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArtList;
