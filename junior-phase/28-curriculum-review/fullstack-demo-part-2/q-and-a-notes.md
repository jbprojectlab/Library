## map dispatch to props object format

Frequently with `mapDispatchToProps` we will do something like:

```js
// ...
// mapDispatchToProps is a function
const mapDispatchToProps = dispatch => ({
  methodA: () => dispatch(someThunkCreatorA()),
  methodB: () => dispatch(someThunkCreatorB())
});
// ...
```

Because this pattern is some common, the react-redux library decided it should be possible to specify a shorthand version of it:

```js
// ...
// mapDispatchToProps is an OBJECT
const mapDispatchToProps = {
  methodA: someThunkCreatorA,
  methodB: someThunkCreatorB
};
// ...
```

The react-redux library will convert that into the function above. If the prop method names and thunk creator names are the same, then it could just be:

```js
// ...
// mapDispatchToProps is an OBJECT
const mapDispatchToProps = {
  someThunkCreatorA,
  someThunkCreatorB
};
// ...
```

## own props

Is relevant to the react-redux library, and `connect`. "Own props" is available as the second argument to "map state to props" and "map dispatch to props".

*What info does it contain?*

It contains the props passed to the connected component from wherever that component is rendered.

*Where is that info coming from?*

The information is specified by *whatever* is rendering the connected component.

## edit user, default values in the form

Here's our `EditUser`:

```jsx
// ...
class EditUser extends Component {
  componentDidMount () {
    this.props.loadThisUser();
  }
  // ...
  render () {
    const {user} = this.props;
    // ...
    return (
      // ...
      <UserForm
        defaultName={user.name}
        defaultProfilePhoto={user.profilePhoto}
        onSubmitUser={handleSubmitUser} />
      // ...
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
  // ...
});
// ...
```

`EditUser` receives the "currently selected user" from the store state via `mapStateToProps` (and it also makes sure to load the appropriate data by calling `this.props.loadThisUser` in `componentDidMount`). It then takes the `name` value and the `profilePhoto` value of that user and passes it to the `UserForm` as props.

Here's our `UserForm`:

```jsx
// ...
class UserForm extends Component {
  // ...
  render () {
    const {defaultName, defaultProfilePhoto} = this.props;
    // ...
    return (
      // ...
      <input
        type='text'
        name='name'
        defaultValue={defaultName} />
      // ...
      <input
        type='text'
        name='profilePhoto'
        defaultValue={defaultProfilePhoto} />
      // ...
    );
  }
}
// ...
```

The `UserForm` receives those props and in turn passes them to its `input`s as [`defaultValue`s](https://reactjs.org/docs/uncontrolled-components.html#default-values). This ultimately sets the initial value of those `input`s, but that's it—the value afterwards will update according to default user interactions with that `input`.

*How are we getting the values out from the form?*

We get the form values directly from the event target, the input elements themselves:

```js
// ...
class UserForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const profilePhoto = event.target.profilePhoto.value;
    this.props.onSubmitUser({name, profilePhoto});
  }
  // ...
}
// ...
```

We are not controlling the state of these inputs ("uncontrolled component"), we are relying on our web browser to do whatever it does by default to update the input values properly based on user interaction.

As a controlled component, we could (potentially) implement `UserForm` like this:

```jsx
import React, {Component} from 'react';

class UserForm extends Component {
  constructor () {
    super();
    this.state = {
      name: this.props.defaultName,
      profilePhoto: this.props.defaultProfilePhoto
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const profilePhoto = event.target.profilePhoto.value;
    this.props.onSubmitUser({name, profilePhoto});
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render () {
    const {handleSubmit, handleChange} = this;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>name</label>
          <input
            type='text'
            name='name'
            value={this.state.name}
            onChange={handleChange} />
        </div>
        <div>
          <label>profile photo URL</label>
          <input
            type='text'
            name='profilePhoto'
            value={this.state.profilePhoto}
            onChange={handleChange} />
        </div>
        <div>
          <button type='submit'>submit</button>
        </div>
      </form>
    );
  }
}

export default UserForm;
```

## user form re-usability

*How does the `onSubmitUser` work?*

In `EditUser`:

```jsx
// ...
class EditUser extends Component {
  // ...
  handleSubmitUser = async userData => {
    const updatedUser = await this.props.updateThisUser(userData);
    this.props.history.push(`/people/${updatedUser.id}`);
  }
  render () {
    // ...
    const {handleSubmitUser} = this;
    return (
      // ...
      <UserForm
        defaultName={user.name}
        defaultProfilePhoto={user.profilePhoto}
        onSubmitUser={handleSubmitUser} />
      // ...
    );
  }
}
// ...
const mapDispatchToProps = (dispatch, ownProps) => ({
  // ...
  updateThisUser: userData => {
    const id = getId(ownProps);
    return dispatch(putUser(id, userData))
  }
});
// ...
```

In `NewUserForm`:

```jsx
// ...
class NewUserForm extends Component {
  // ...
  handleSubmitUser = async userData => {
    const newUser = await this.props.createUser(userData);
    this.props.history.push(`/people/${newUser.id}`);
  }
  // ...
  render () {
    const {handleSubmitUser, startShowingForm, stopShowingForm} = this;
    // ...
    return (
      // ...
      <UserForm onSubmitUser={handleSubmitUser} />
      // ...
    );
  }
}
const mapDispatchToProps = dispatch => ({
  createUser: userData => dispatch(postUser(userData))
});
// ...
```

In `UserForm`:

```jsx
// ...
class UserForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const profilePhoto = event.target.profilePhoto.value;
    this.props.onSubmitUser({name, profilePhoto});
  }
  render () {
    // ...
    const {handleSubmit} = this;
    return (
      <form onSubmit={handleSubmit}>
        {/* ... */}
      </form>
    );
  }
}
// ...
```

So let's talk about what happens when a someone is looking at the new user form and hits the submit button. That triggers the internal submit event of the form, so it calls the `UserForm`'s `handleSubmit`. In turn that calls `this.props.onSubmitUser({name, profilePhoto})` and passes that the user data it gathers from the form inputs. In turn this triggers `NewUserForm`'s `hanldeSubmitUser` (due to `<UserForm onSubmitUser={handleSubmitUser} />` in `NewUserForm`). Which itself calls `this.props.createUser(userData)` with the user data provided to it by `UserForm`. The `.createUser` prop came from `mapDispatchToProps` and will invoke `dispatch(postUser(userData))`, setting off the thunk to make an AJAX POST request to the server.

Edit user has a similar flow, except it will call `this.props.updateThisUser(userData)` in its `handleSubmitUser` and thus trigger a different thunk / AJAX request (PUT).

This is the whole reason that the `UserForm` needed to specify a `handleSubmitUser` prop—*what happens to the user data upon submitting* depends on the context where each `UserForm` instance is being utilized / rendered.
