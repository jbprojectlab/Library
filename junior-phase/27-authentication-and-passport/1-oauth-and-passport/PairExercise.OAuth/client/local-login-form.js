import React from 'react'
import {connect} from 'react-redux'

import {login} from './store'

const LocalLoginForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div className='flex column'>
      <div className='flex column m1'>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' className='input' />
      </div>
      <div className='flex column m1'>
        <label htmlFor='email'>Password</label>
        <input type='password' name='password' className='input' />
      </div>
      <div className='m1'>
        <button type='submit' className='btn bg-blue white p1 rounded'>Submit</button>
      </div>
    </div>
  </form>
)

const mapDispatchToProps = (dispatch, ownProps) => {
  // Hey, check it out! Because we pass the connected Login to a Route
  // (we do this in client/index.js), it receives the "route props"
  // (match, location, and history) as its "own props".
  const history = ownProps.history

  return {
    async handleSubmit (evt) {
      evt.preventDefault()
      // trigger thunk (AJAX login request)
      const thunk = login({
        email: evt.target.email.value,
        password: evt.target.password.value
      })
      await dispatch(thunk)
      // once that is complete, change the URL to /home
      history.push('/home')
    }
  }
}

export default connect(null, mapDispatchToProps)(LocalLoginForm)
