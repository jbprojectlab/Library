import React from 'react'

import LocalLoginForm from './local-login-form'
import OAuthLoginForm from './oauth-login-form'

const Login = () => (
  <div className='h100 w100 flex column align-items-center justify-center'>
    <h1>Let's Loggin'!</h1>
    <div className='flex w50'>
      <img src='/loggin.png' />
      <div className='grow1'>
        <LocalLoginForm />
        <OAuthLoginForm />
      </div>
    </div>
  </div>
)

export default Login
