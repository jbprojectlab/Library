// a library for constructing declarative user interfaces (allows us to define and use components)
import React from 'react';
// a library that allows us to render react components to the browser DOM
import ReactDOM from 'react-dom';

const letters = 'abcdefghijklmnopqrstuvwxyz';
const generateRandomLetter = () => {
  const randIndex = Math.floor(Math.random() * letters.length);
  return letters[randIndex];
};

// `class...extends` is JS (not react)
class RandomLetterView extends React.Component {
  constructor () {
    super(); // call the constructor the class we are extending from (not specific to react)
    // state is any data THAT MIGHT CHANGE
    this.state = {
      text: 'not random yet'
    };
  }
  // react components need a `render` method (in order for us to use them as react components, i.e. <Hello></Hello>)
  render () {
    return (
      // below is JSX syntax
      <div className='text-red'>
        <h2>{this.state.text}</h2>
        <button onClick={() => {
          // `.setState` is a method that all react component instances have (given to us)
          this.setState({
            text: generateRandomLetter()
          });
          // // below is BAD!! will not cause re-render!
          // this.state.text = generateRandomLetter();
        }}>
          make random letter
        </button>
      </div>
    );
  }
}

class Welcome extends React.Component {
  render () {
    return (
      <h1>HI???</h1>
    );
  }
}

ReactDOM.render(
  <div>
    <Welcome />
    <RandomLetterView />
  </div>,
  document.getElementById('root-content')
);
