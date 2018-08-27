import React, { Component } from 'react';
import { connect } from 'react-redux';
import SlideShow from './components/SlideShow';
import { login, selectUserName } from './reducers/auth';
import { fetchRooms, selectRoom } from './reducers/rooms';

class App extends Component {
  componentDidMount() {
    const { login, fetchRooms } = this.props;
    login();
    fetchRooms();
  }

  render() {
    const { isFetching, userName, accomodation } = this.props;
    if(isFetching) return <div className="loader"/>;
    return (
      <div className="App">
        <div className="main">
          <img src="./logo.png" width={250} alt="Redux Hotel" />
          <h1>Your Reservation</h1>
          <p>Name: {userName}</p>
          <h2>Accomodation</h2>
          <p><em>{accomodation.name}</em></p>
          <p><img src={accomodation.image} width={300} alt="accomodation"/></p>
        </div>
        <SlideShow />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching || state.rooms.isFetching,
    userName: selectUserName(state),
    accomodation: selectRoom(state, state.auth.user.reservation.roomType)
  };
};

const mapDispatchToProps = { login, fetchRooms };

export default connect(mapStateToProps, mapDispatchToProps)(App);
