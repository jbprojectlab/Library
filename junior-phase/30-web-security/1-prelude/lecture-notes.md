# Understanding the Auther Starting Point

## when / how does a "signup" form get rendered?

End user clicks signup button in the navbar, which takes them to `/signup` and they see a signup form.

In our react app we have a generic `Auth` component:

```jsx
const Auth = (props) => {
  const { message, handleSubmit } = props
  return (
    <div className='signin-container'>
      <div className='buffer local'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>email</label>
            <input
              name='email'
              type='email'
              className='form-control'
              required
            />
          </div>
          <div className='form-group'>
            <label>password</label>
            <input
              name='password'
              type='password'
              className='form-control'
              required
            />
          </div>
          <button type='submit' className='btn btn-block btn-primary'>{message}</button>
        </form>
      </div>
      <div className='or buffer'>
        <div className='back-line'>
          <span>OR</span>
        </div>
      </div>
      <div className='buffer oauth'>
        <p>
          <a
            target='_self'
            href='/auth/google'
            className='btn btn-social btn-google'>
            <i className='fa fa-google' />
            <span>{message} with Google</span>
          </a>
        </p>
      </div>
    </div>
  )
}
```

The `Signup` component is created by `connect`ing `Auth`: `const Signup = connect(mapStateSignup, mapDispatchSignup)(Auth)`.

We also have a route defined over in `Root.js`: `<Route path='/signup' component={Signup} />`.

## what happens when a user submits their signup info?

- `handleSubmit` is invoked
- `dispatch`es the `signup(...)` thunk
- triggers AJAX post to `/auth/local/signup` with the email and password they entered
- cookie gets attached to request by browser
- THE INTERNET
- server receives the request
- run through express our middleware
- logging middleware: logs stuff about the request
- body parsing middleware: in this case the request body will be the credentials (email, password)
- session middleware: this incoming request has a session cookie on it already, so it looks up a session object by that session cookie id, and puts that sesion object on the request—assigns `req.session` and then calls `next()`
- passport middleware: passport initialize middleware, which gives us certain request methods, like `req.logIn`; passport session middleware establishes `req.user` (there's nobody logged in yet, let's ignore this)
- doesn't match the /api route
- DOES match the /auth route
- DOES match the (nested) /local route
- matches the `router.post('/signup', ...)`
- finds or creates a user based on the credentials that were submitted
- calls `req.logIn(user)` on that user
- where did `req.logIn` come from? this comes from passport
- `req.logIn` will store something about that user on the session (somewhere on the session)
- passport determines what piece of info about the user to store on the session based on what we provide to `passport.serializeUser` (which is to say the user's id)
- at the top level, this means there is now user id somewhere on the session, which means that user is "logged in"
- when the login process is complete, we `res.json(user)`
- THE INTERNET
- ...when that comes back
- call `setUserAndRedirect(...)` utility function
- `dispatch`es `setCurrentUser(...)` action and the `create(...)` action and changes the URL to go to that user's profile page
- updates the store (via the auth reducer) so that user we got back from the post request is now `.currentUser` on the store state
- updates the store (via the users reducer) so that user we got back from the post request is now at the end of the array of `.users` on the store state

Refresh on cookie v session v logged in user...

- Cookie: a text file created by a server and given to a client in a response—the client will then send that cookie with every future request (has many purposes, one of them is for authentication)
- Session: an object on the server side that contains information about the particular client that has sent an incoming request—that session object is looked up by id, and that id comes from a cookie ("session cookie")
- Logged in user: the human actually interacting with our application, who at some point sent us credentials verifying their identity—we keep track of the currently logged in user by storing their user id on the session object associated with that client

## how does the redux store state `currentUser` get defined when a user first loads the application?

- when the `Root` component has mounted, it runs `this.props.fetchInitialData()`
- which (among other things), `dispatch`es `fetchCurrentUser()`
- which triggers an AJAX request GET `/auth/local/me`
- THE INTERNET
- server receives the request, runs through various middleware, the highlights below
- session middleware: attaches `req.session` as the session object / data associated with the particular client who has made this request
- passport session middleware: looks for a value on the session object that passport stored there (e.g. a user id which would be there if on a previous request from this same client `req.logIn` was triggered), if it finds that value and deserializes it according to the callback we provide, passes the user id to our callback which in turn passes back a `user` instance (via sequelize), and passport (the passport session middleware) takes that user instance and puts it on the requst as `req.user`
- our local auth router matches and has a `router.get('/me', ...)`
- which gets the `.user` off of the request object and sends it!
- THE INTERNET
- ...when that comes back
- we `dispatch` the `setCurrentUser(...)` action using the response data
- which triggers the reducer
- the auth reducer returns the `action.user` which was the response data
- the redux store state `.currentUser` becomes whatever the server responded with

## what do we use `req.session` for?

Any information that we want—for client-specific things. That `req.session` object is empty by default, but we can put ANYTHING on it and that stuff will persist for that particular client for future requests.

Currently in the auther codebase, we don't directly interact with `req.session`. Information is stored on it and accessed from it, but that all happens via passport.

From the client side? There is no session data stored anywhere on the client. The client only holds a cookie with a session id (JUST the id).
