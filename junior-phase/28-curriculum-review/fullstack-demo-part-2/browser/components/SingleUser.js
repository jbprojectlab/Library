import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchOneUser, singleUserSelector} from '../reducers/users';

class SingleUser extends Component {
  componentDidMount () {
    // ensures that the end user sees the CURRENT information about the selected user
    // also ensures that the app will work even if the "entry point" is this component
    this.props.loadThisUser();
  }
  render () {
    const {user} = this.props;
    return (
      !user
      ? <div>No such user found</div>
      : (
        <div>
          <h3>{user.name}</h3>
          <img src={user.profilePhoto} height='200' width='200' />
        </div>
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: singleUserSelector(state.users, Number(ownProps.match.params.userId))
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadThisUser: () => {
    const id = Number(ownProps.match.params.userId);
    dispatch(fetchOneUser(id));
  }
});

const ConnectedSingleUser = connect(mapStateToProps, mapDispatchToProps)(SingleUser);

export default ConnectedSingleUser;
