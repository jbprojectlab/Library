import axios from 'axios';

// Constants
export const ROOMS_REQUEST = 'ROOMS_REQUEST';
export const ROOMS_SUCCESS = 'ROOMS_SUCCESS';
export const ROOMS_FAILURE = 'ROOMS_FAILURE';

// Action Creators
const fethingRooms = () => ({
  type: ROOMS_REQUEST,
});

const roomsSuccess = (roomsList) => ({
  type: ROOMS_SUCCESS,
  payload: roomsList,
});

const roomsError = (error) => ({
  type: ROOMS_FAILURE,
  error: 'Failed to fetch rooms',
  payload: error,
});

export const fetchRooms = () => {
  return async (dispatch) => {
    dispatch(fethingRooms());
    try {
      const {data} = await axios.get("/rooms")
      dispatch(roomsSuccess(data));  
    } catch (error) {dispatch(roomsError(error))}
  };
}

// Selectors
export const selectRoom = (state, roomType) => {
  const room = state.rooms.list.find(room => room.id === roomType);
  return room || {};
}

// Reducer
const initialState = { 
  list:[], 
  isFetching: false 
};

const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOMS_REQUEST: 
    return { ...state, isFetching: true }
    case ROOMS_SUCCESS:
      return { list: action.payload, isFetching: false }
    default:
      return state;
  }
};

export default roomsReducer;