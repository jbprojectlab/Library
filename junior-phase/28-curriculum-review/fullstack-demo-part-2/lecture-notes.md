## walkthrough of receiving the created user in `NewUserForm`

- when data is submitted to `handleSubmitUser`
- we call `this.props.createUser(userData)`
- that calls `dispatch(postUser(userData))`
- that invokes our thunk:

```js
// ...
async dispatch => {
  const {data: user} = await axios.post('/api/users', userData);
  dispatch(insertUser(user));
  // whatever we return here will be available to whatever code dispatches this thunk
  return user;
};
// ...
```

- that ultimately makes a post request
- and `return`s the response data of that post request

- so `this.props.createUser(userData)` called an `async` function that `return`s the newly created user data
- so if we `await this.props.createUser(userData)` then we will receive that newly created user data
- which is what we're doing in our `handleSubmitUser`

```js
// ...
class NewUserForm extends Component {
  // ...
  handleSubmitUser = async userData => {
    const newUser = await this.props.createUser(userData);
    this.props.history.push(`/people/${newUser.id}`);
  }
  // ...
}
// ...
```
