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
      if (this.props.isGameActive) {
        this.props.decrementTime();
      }
    }, 1000);
  }
  componentDidUpdate (prevProps) {
    if (!this.props.isGameActive && prevProps.isGameActive) {
      this.props.submitScore();
      this.props.resetCurrentScore();
    }
  }
  render () {
    return (
      <div>
        <h2>
          Click quickly!
        </h2>
        {!this.props.isGameActive
          ? <button onClick={this.props.start}>start</button>
          : (
            <div>
              <div>Time remaining: {this.props.timeRemaining}</div>
              <div>Current score: {this.props.currentScore}</div>
              <div>
                <button onClick={this.props.incrementCurrentScore}>HURRY!</button>
              </div>
            </div>
          )
        }
        <div>
          <h4>Past scores...</h4>
          {this.props.scores.isLoading
            ? 'loading'
            : this.props.scores.data.length === 0
            ? 'none'
            : this.props.scores.data.map((score, idx) => (
              <div key={idx}>{score.amount}</div>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  isGameActive: state.timeRemaining > 0
});

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
