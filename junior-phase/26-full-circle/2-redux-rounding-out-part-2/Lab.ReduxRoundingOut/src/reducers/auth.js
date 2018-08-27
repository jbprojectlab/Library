import axios from 'axios';

// Constants
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

// Action Creators
const authenticating = () => ({
  type: AUTH_REQUEST,
});

const authenticate = (userData) => ({
  type: AUTH_SUCCESS,
  payload: userData,
});

const authError = (error) => ({
  type: AUTH_FAILURE,
  error: 'Failed to authenticate',
  payload: error,
});

export const login = () => {
  return async (dispatch) => {
    dispatch(authenticating());
    try {
      const {data} = await axios.get("/auth")
      dispatch(authenticate(data));
    } catch (error) { dispatch(authError(error)) }
  };
}

// Selectors

export const selectUserName = (state) => {
  const user = state.auth.user;
  const title = user.gender === "Male" ? "Mr." : "Ms.";
  return `${title} ${user.firstName} ${user.lastName}`;
}

// Reducer

const initialState = { 
  user: {
    firstName: "",
    lastName: "",
    gender: "",
    reservation: {}
  }, 
  isFetching: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, isFetching: true }
    case AUTH_SUCCESS:
      return { user: action.payload, isFetching: false };
    default:
      return state;
  }
};


export default authReducer;
