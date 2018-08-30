import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchOneUser, deleteOneUser, singleUserSelector} from '../reducers/users';

class SingleUser extends Component {
  componentDidMount () {
    // ensures that the end user sees the CURRENT information about the selected user
    // also ensures that the app will work even if the "entry point" is this component
    this.props.loadThisUser();
  }
  handleClick = async () => {
    await this.props.destroyThisUser();
    this.props.history.push('/people');
  }
  render () {
    const {user} = this.props;
    const {handleClick} = this;
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
              </h3>
              <img src={user.profilePhoto} height='200' width='200' />
              <div>
                <button onClick={handleClick}>
                  delete this user
                </button>
              </div>
            </div>
          )
        }
      </div>
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
  destroyThisUser: () => {
    const id = getId(ownProps);
    dispatch(deleteOneUser(id));
  }
});

const ConnectedSingleUser = connect(mapStateToProps, mapDispatchToProps)(SingleUser);

export default ConnectedSingleUser;
