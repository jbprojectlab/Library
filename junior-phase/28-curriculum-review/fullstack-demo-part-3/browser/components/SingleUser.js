import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {
  fetchOneUser,
  deleteOneUser,
  singleUserSelector,
  postFriendship,
  fetchUsers
} from '../reducers/users';
import UserListLinks from './UserListLinks';

const getId = props => Number(props.match.params.userId);

const isFriendOf = (user, friendUserId) => {
  return user.friends && user.friends.some(friend => friend.id === friendUserId);
};

class SingleUser extends Component {
  async componentDidMount () {
    // ensures that the end user sees the CURRENT information about the selected user
    // also ensures that the app will work even if the "entry point" is this component
    await this.props.loadUsers();
    await this.props.loadThisUser();
  }
  async componentDidUpdate (prevProps) {
    if (getId(this.props) !== getId(prevProps)) {
      await this.props.loadUsers();
      await this.props.loadThisUser();
    }
  }
  handleClickDelete = async () => {
    await this.props.destroyThisUser();
    this.props.history.push('/people');
  }
  handleSubmitFriend = async event => {
    event.preventDefault();
    this.props.addFriendForThisUser(event.target.friendUserId.value);
  }
  render () {
    const {user, allOtherUsers} = this.props;
    const {handleClickDelete, handleSubmitFriend} = this;
    return (
      <div>
        <Link to='/people'>back to everyone</Link>
        {
          !user
          ? <div>No such user found</div>
          : (
            <div>
              <h3>
                <span>{user.name} </span>
                <Link to={`/people/${user.id}/edit`}>
                  <button>edit</button>
                </Link>
                <button onClick={handleClickDelete}>
                  delete
                </button>
              </h3>
              <img src={user.profilePhoto} height='200' width='200' />
              <div>
                <div><strong>their friends...</strong></div>
                <form onSubmit={handleSubmitFriend}>
                  <select name='friendUserId'>
                    {allOtherUsers.map(eachUser => (
                      <option
                        key={eachUser.id}
                        value={eachUser.id}
                        disabled={isFriendOf(user, eachUser.id)}>
                        {eachUser.name}
                      </option>
                    ))}
                  </select>
                  <button type='submit'>
                    add friend
                  </button>
                </form>
                {!user.friends || user.friends.length === 0
                  ? '(no friends...yet)'
                  : <UserListLinks users={user.friends} />
                }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  allOtherUsers: state.users.filter(eachUser => eachUser.id !== getId(ownProps)),
  user: singleUserSelector(state.users, getId(ownProps))
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUsers: () => dispatch(fetchUsers()),
  loadThisUser: () => {
    const id = getId(ownProps);
    dispatch(fetchOneUser(id));
  },
  destroyThisUser: () => {
    const id = getId(ownProps);
    dispatch(deleteOneUser(id));
  },
  addFriendForThisUser: friendId => {
    const ownId = getId(ownProps);
    dispatch(postFriendship(ownId, friendId));
  }
});

const ConnectedSingleUser = connect(mapStateToProps, mapDispatchToProps)(SingleUser);

export default ConnectedSingleUser;
