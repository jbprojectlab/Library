import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchUsers} from '../reducers/users';
import NewUserForm from './NewUserForm';
import UserListLinks from './UserListLinks';

class AllUsers extends Component {
  componentDidMount () {
    this.props.loadUsers();
  }
  render () {
    return (
      <div>
        <h2>Here are all the people...</h2>
        <NewUserForm />
        <hr />
        <UserListLinks users={this.props.list} />
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
