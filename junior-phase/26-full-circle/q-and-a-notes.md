## file structure (specifically for redux)

"Horizontal" (by responsibility) vs "vertical" (by end user use case) still applies.

An example of horizontal:

```
/reducers
  cats.js
  dogs.js
/actions
  cats.js
  dogs.js
/action-types
  cats.js
  dogs.js
```

An example of vertical (this is often called the "ducks" pattern):

```
/ducks
  cats.js
  dogs.js
```

Also often ducks is called reducers:

```
/reducers
  cats.js
  dogs.js
```

Where cats.js contains the action types, action creators (including thunks), and the reducer for the cats state.

Another "vertical" example:

```
/cats
  reducer.js
  actions.js
  action-types.js
/dogs
  reducer.js
  actions.js
  action-types.js
```

Choosing file organization:

- What kinds updates to the code do I exepct to make?
- How / where am I going to import things?

## postman / curl

A GUI tool for making HTTP requests. Like a browser, but does not render HTML or execute Javascript. So really more like a suped up URL bar.

You can specify not only the URL you want to visit, but also:

- the HTTP verb (e.g. GET, POST, PUT)
- the request headers
- the request body
- the query string (which you can already do in a normal browser URL bar)

Nice for "manually" testing backend routes.

curl is a similar purpose tool, but you use it from the command line. All from the terminal, which in my opinion makes it worse for manual testing but potentially for integrating with other command tools.

## where does data in a request go?

The options:

- in the route (in the URL)
- in the query string (at the end of URL)
- in the bod (not at all in URL, its attached to the end of the request)
- in the headers (not at all in the URl, its attached to the beginning of the request)

In reality, you can use the route / query string / body to contain whatever data if you really want to. That is, how you send data is not mandatory.

Here's what's standard though:

- use the route for "resource identification", all nouns, all attempting to identify a particular "resource" on the server (e.g. /api/dogs/1, 1 is a model id, the route specifies some action related to the resource "dog 1 in the api")
- use the query string for filtering / querying for that particular resource (e.g. /api/dogs?name=Fred, the URL specifies some action related to the resrouce "all dogs" but specifically "where name is fred")
- use the body for information that will be used to insert / alter / create / update / edit the resource

Adhering to these standards is often considered part of REST.

Headers are really their own thing. In general you'll use a header to configure something already built in to HTTP somehow. Often, meta-information about the request.

## authentication and REST

If the "currently logged in user" is a resource, how should we model it RESTfully on our server? What should our routes be?

The possible actions to take on this resource:

- find the "currently logged in user" (*who am I*)
- update who the "currently logged in user" is (*login*)
- create a brand new "currently logged in user" (*signup*)
- remove the "currently logged in user" (*logout*)

So it makes sense to think of our resource as the "currently logged in user", i.e. /api/currently-logged-in-user or /api/me. The different actions above:

- GET /api/me: find the "currently logged in user" (*who am I*)
- PUT /api/me: update who the "currently logged in user" is (*login*)
- POST /api/me: create a brand new "currently logged in user" (*signup*)
- DELETE /api/me: remove the "currently logged in user" (*logout*)

## selectors

Difficulty keeping execution flow in your head when reading through all this higher-order function stuff.

Some tips (maybe, hopefully):

- Write out comments explaining what things are: not only for reading them later, but the practice of making your understanding of the code concrete
- Try to frame questions in ways where finding the answer won't "explode". An example of a "well framed" question: *what is the signature of this function*, *what is going to use this function and when*
- Take it one step at a time, keep your vision well scoped to the one step you are on

## `connect` from the inside out

First, an exmample of connect from the "oustide":

```jsx
// ...
export class NameEntry extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    const { value: name } = event.target
    this.props.userSet(name)
  }
  render() {
    return (
      <React.Fragment>
        <label htmlFor="name">{this.props.label}:</label>
        <input
          name="name"
          onChange={this.handleChange}
          value={this.props.userName}
        />
      </React.Fragment>
    )
  }
}

const ConnectedNameEntry = connect(
  state => ({
    userName: state.user,
  }),
  (dispatch, ownProps) => ({
    userSet: nameStr => dispatch(userSet(ownProps.userTitle + ' ' + nameStr)),
  })
)(NameEntry);

export default ConnectedNameEntry;
```

And somewhere else:

```jsx
// ...
<ConnectedNameEntry label="Your name" userTitle="Empress" />
// ...
```

Reverse engineering `connect` (not because we need to, but to help understand how it all works):

```jsx
const connect = (mapStateToPropsFn, mapDispatchToPropsFn) => {
  const connector = (InnerComponent) => {
    return class ConnectedComponent extends React.Component {
      componentDidMount () {
        // listen for changes and trigger re-render
        this.unsubscribe = store.subscribe(() => {
          this.forceUpdate();
        });
      }
      componentWillUnmount () {
        // stop listening (because the comopnent is no longer on the view)
        this.unsubscribe();
      }
      render () {
        // the props that get passed to the connect component
        const ownProps = this.props;
        const store = this.context.store; // psuecode-ish (we would have to look up the context API in react)
        const dispatchProps = mapDispatchToPropsFn(store.dispatch, ownProps);
        const stateProps = mapStateToPropsFn(store.getState(), ownProps);
        // merge the objects we get back from above
        const innerComponentProps = {
          ...dispatchProps,
          ...stateProps,
          // make sure to pass the props that get passed to the connected component to the inner component
          ...ownProps
        };
        // pass the merged props to the inner component
        return (
          <InnerComponent {...innerComponentProps} />
        );
      }
    };
  };
  return connector;
};
```
