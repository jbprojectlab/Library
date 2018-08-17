import '@tmkelly28/tk-css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const Home = () => (
  <h1>Welcome home!</h1>
)

const User = (props) => (
  <h1>Welcome, {props.username}</h1>
)

const allMyInfo = {
  username: 'Cody',
  age: 8
}

const otherInfo = {
  username: 'Doug'
}

class Counter extends React.Component {
  constructor () {
    this.state = {
      count: 0
    }
    this.increment = () => {}
  }

  state = {
    count: 0
  }

  increment = () => {}


  increment () {
    // :(
    // this.setState({
    //   count: this.state.count + 1
    // })
    //
    // :)
    // this.setState((prevState) => {
    //    return {
    //      count: prevState.count + 1
    //    }
    // })
  }
}

/*
class StatefulForm extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }

    this.methods = {
      handleChange: this.handleChange.bind(this),
      handleSubmit: this.handleSubmit.bind(this)
    }
  }

  handleChange () {

  }

  handleSubmit () {

  }

  render () {
    return (
      <StatelessForm {...this.state} {...this.methods} />
    )
  }
}
*/

/*
 * Does this need to be an arrow class property?
 * if (getting passed as prop && uses this) return true
 * else return false
 */

ReactDOM.render(
  <div className='bg-blue column center-xy fill-xy'>
    <Router>
      <React.Fragment>
        <Route path='/user' render={
          (routeProps) => <User />
        } />
        <Route exact path='/' component={Home} />
      </React.Fragment>
    </Router>
  </div>,
  document.getElementById('app')
)
