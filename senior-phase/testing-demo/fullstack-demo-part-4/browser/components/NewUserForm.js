import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';

import UserForm from './UserForm';
import {postUser} from '../reducers/users';

class NewUserForm extends Component {
  constructor () {
    super();
    this.state = {
      showForm: false,
      redirectTo: undefined
    };
  }
  handleSubmitUser = async userData => {
    const newUser = await this.props.createUser(userData);
    this.setState({
      redirectTo: `/people/${newUser.id}`
    });
  }
  startShowingForm = () => {
    this.setState({showForm: true});
  }
  stopShowingForm = () => {
    this.setState({showForm: false});
  }
  render () {
    const {handleSubmitUser, startShowingForm, stopShowingForm} = this;
    const {showForm, redirectTo} = this.state;
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return (
      !showForm
      ? <button onClick={startShowingForm}>add a user</button>
      : (
        <div>
          <h3>
            <span>Create a new user </span>
            <button onClick={stopShowingForm}>cancel</button>
          </h3>
          <UserForm onSubmitUser={handleSubmitUser} />
        </div>
      )
    );
  }
}

export const PresentationalComponent = NewUserForm;

const mapDispatchToProps = dispatch => ({
  createUser: userData => dispatch(postUser(userData))
});

const ConnectedNewUserForm = withRouter(connect(null, mapDispatchToProps)(NewUserForm));

export default ConnectedNewUserForm;
