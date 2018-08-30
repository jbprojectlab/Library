import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchUsers} from '../reducers/users';

class AllUsers extends Component {
  componentDidMount () {
    this.props.loadUsers();
  }
  render () {
    return (
      <div>
        <h2>Here is everybody...</h2>
        {this.props.list.map(user => (
          <div key={user.id}>
            <h3>
              {user.name}
            </h3>
            <img src={user.profilePhoto} height='200' width='200' />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.users
});

const mapDispatchToProps = dispatch => ({
  loadUsers: () => dispatch(fetchUsers())
});

const ConnectedAllUsers = connect(mapStateToProps, mapDispatchToProps)(AllUsers)

export default ConnectedAllUsers;
