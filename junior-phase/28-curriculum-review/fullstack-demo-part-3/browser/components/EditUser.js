import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import UserForm from './UserForm';
import {putUser, singleUserSelector, fetchOneUser} from '../reducers/users';

class EditUser extends Component {
  componentDidMount () {
    // ensures that the end user sees the CURRENT information about the selected user
    // also ensures that the app will work even if the "entry point" is this component
    this.props.loadThisUser();
  }
  handleSubmitUser = async userData => {
    const updatedUser = await this.props.updateThisUser(userData);
    this.props.history.push(`/people/${updatedUser.id}`);
  }
  render () {
    const {user} = this.props;
    const {handleSubmitUser} = this;
    return (
      !user
      ? <div>No such user found</div>
      : (
        <div>
          <h3>
            <span>Edit this user </span>
            <Link to={`/people/${user.id}`}>
              <button>cancel</button>
            </Link>
          </h3>
          <UserForm
            defaultName={user.name}
            defaultProfilePhoto={user.profilePhoto}
            onSubmitUser={handleSubmitUser} />
        </div>
      )
    );
  }
}

const getId = props => Number(props.match.params.userId);

const mapStateToProps = (state, ownProps) => ({
  user: singleUserSelector(state.users, getId(ownProps))
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadThisUser: () => {
    const id = getId(ownProps);
    dispatch(fetchOneUser(id));
  },
  updateThisUser: userData => {
    const id = getId(ownProps);
    return dispatch(putUser(id, userData))
  }
});

const ConnectedEditUser = connect(mapStateToProps, mapDispatchToProps)(EditUser);

export default ConnectedEditUser;
