import React from 'react';
import {connect} from 'react-redux';

import {
  start,
  incrementCurrentScore,
  fetchScores,
  decrementTime,
  submitScore,
  resetCurrentScore
} from '../store';

class Main extends React.Component {
  componentDidMount () {
    this.props.fetchScores();
    setInterval(() => {
      if (this.props.timeRemaining > 0) {
        this.props.decrementTime();
      }
    }, 1000);
  }
  componentDidUpdate (prevProps) {
    if (this.props.timeRemaining === 0 && prevProps.timeRemaining !== 0) {
      this.props.submitScore();
      this.props.resetCurrentScore();
    }
  }
  render () {
    return (
      <div>
        <h2>
          <span>Click quickly! </span>
          <button onClick={this.props.start}>start</button>
        </h2>
        <div>
          <div>Time remaining: {this.props.timeRemaining}</div>
          <div>Current score: {this.props.currentScore}</div>
          <div>
            <button onClick={this.props.incrementCurrentScore}>HURRY!</button>
          </div>
        </div>
        <div>
          <h4>Past scores...</h4>
          {this.props.scores.map((score, idx) => (
            <div key={idx}>{score.amount}</div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(start()),
  incrementCurrentScore: () => dispatch(incrementCurrentScore()),
  fetchScores: () => dispatch(fetchScores()),
  decrementTime: () => dispatch(decrementTime()),
  submitScore: () => dispatch(submitScore()),
  resetCurrentScore: () => dispatch(resetCurrentScore())
});

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main)

export default ConnectedMain;
