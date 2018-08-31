import axios from 'axios';

// action types
const RECEIVE_USERS = 'RECEIVE_USERS';
const RECEIVE_ONE_USER = 'RECEIVE_ONE_USER';
const INSERT_USER = 'INSERT_USER';
const REMOVE_ONE_USER = 'REMOVE_ONE_USER';
const RECEIVE_FRIEND = 'RECEIVE_FRIEND';

// action creators
const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const receiveOneUser = user => ({
  type: RECEIVE_ONE_USER,
  user
});

const insertUser = user => ({
  type: INSERT_USER,
  user
});

const removeOneUser = userId => ({
  type: REMOVE_ONE_USER,
  userId
});

const receiveFriend = (ownId, friend) => ({
  type: RECEIVE_FRIEND,
  ownId,
  friend
});

// thunk creators
export const fetchUsers = () => {
  return async dispatch => {
    const {data: users} = await axios.get('/api/users');
    dispatch(receiveUsers(users));
  };
};

export const fetchOneUser = id => {
  return async dispatch => {
    const {data: user} = await axios.get(`/api/users/${id}`);
    const {data: friends} = await axios.get(`/api/users/${id}/friends`);
    user.friends = friends;
    dispatch(receiveOneUser(user));
  };
};

export const postUser = userData => {
  return async dispatch => {
    const {data: user} = await axios.post('/api/users', userData);
    dispatch(insertUser(user));
    // whatever we return here will be available to whatever code dispatches this thunk
    return user;
  };
};

export const deleteOneUser = id => {
  return async dispatch => {
    await axios.delete(`/api/users/${id}`);
    dispatch(removeOneUser(id));
  };
};

export const putUser = (id, updateData) => {
  return async dispatch => {
    const {data: user} = await axios.put(`/api/users/${id}`, updateData);
    dispatch(receiveOneUser(user));
    return user;
  };
};

export const postFriendship = (ownId, friendId) => {
  return async dispatch => {
    const {data: friend} = await axios.post('/api/friends', {userAId: ownId, userBId: friendId});
    dispatch(receiveFriend(ownId, friend));
  };
};

// selectors
export const singleUserSelector = (users, id) => {
  return users.find(user => user.id === id);
};

// initial state and reducer
const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_ONE_USER:
      const alreadyIn = state.some(eachUser => eachUser.id === action.user.id);
      if (alreadyIn) {
        return state.map(eachUser => {
          if (eachUser.id === action.user.id) {
            return action.user;
          } else {
            return eachUser;
          }
        });
      } else {
        return [...state, action.user];
      }
    case INSERT_USER:
      return [...state, action.user];
    case REMOVE_ONE_USER:
      return state.filter(eachUser => eachUser.id !== action.userId);
    case RECEIVE_FRIEND:
      return state.map(eachUser => {
        if (eachUser.id !== action.ownId) {
          return eachUser;
        } else {
          return {
            ...eachUser,
            friends: [
              ...eachUser.friends,
              action.friend
            ]
          };
        }
      });
    default:
      return state;
  }
};

export default usersReducer;
