import React from 'react'
import { connect } from 'react-redux'
import { login, signup } from '../redux/auth'

/* -----------------    COMPONENT     ------------------ */

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

/* -----------------    CONTAINER     ------------------ */

const mapStateLogin = () => ({ message: 'Log in' })
const mapDispatchLogin = (dispatch, ownProps) => ({
  handleSubmit: event => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const credentials = {email, password}
    dispatch(login(credentials, ownProps.history))
  }
})

const mapStateSignup = () => ({ message: 'Sign up' })
const mapDispatchSignup = (dispatch, ownProps) => ({
  handleSubmit: event => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const credentials = {email, password}
    dispatch(signup(credentials, ownProps.history))
  }
})

export const Login = connect(mapStateLogin, mapDispatchLogin)(Auth)
export const Signup = connect(mapStateSignup, mapDispatchSignup)(Auth)
