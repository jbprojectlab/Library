import axios from 'axios';

const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const fetchUsers = () => {
  return async dispatch => {
    const {data: users} = await axios.get('/api/users');
    dispatch(receiveUsers(users));
  };
};

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    default:
      return state;
  }
};

export default usersReducer;
