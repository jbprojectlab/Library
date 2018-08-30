import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchUsers} from '../reducers/users';
import NewUserForm from './NewUserForm';

class AllUsers extends Component {
  componentDidMount () {
    this.props.loadUsers();
  }
  render () {
    return (
      <div>
        <h2>Here are all the people...</h2>
        <NewUserForm />
        {this.props.list.map(user => (
          <div key={user.id}>
            <p>
              <Link to={`/people/${user.id}`}>{user.name}</Link>
            </p>
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
