# Redux Rounding Out


## Redux Organization

### Type-based organization

store.js
constants.js (// export const ADD_USER = "ADD_USER")
/actionCreators
  |
  + authActions.js 
  + roomsActions.js
/reducers
  |
  + authReducer.js
  + roomsReducer.js


### Ducks (by entity)

store.js
/reducers
   |
   + auth.js (constants, action creators, reducer)
   + rooms.js (constants, action creators, reducer)