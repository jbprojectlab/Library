import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {postUser} from '../reducers/users';

class NewUserForm extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const profilePhoto = event.target.profilePhoto.value;
    const newUser = await this.props.createUser({name, profilePhoto});
    this.props.history.push(`/people/${newUser.id}`);
  }
  render () {
    const {handleSubmit} = this;
    return (
      <div>
        <h3>Create a new user</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>name</label>
            <input type='text' name='name' />
          </div>
          <div>
            <label>profile photo URL</label>
            <input type='text' name='profilePhoto' />
          </div>
          <div>
            <button type='submit'>submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: userData => dispatch(postUser(userData))
});

const ConnectedNewUserForm = withRouter(connect(null, mapDispatchToProps)(NewUserForm));

export default ConnectedNewUserForm;
