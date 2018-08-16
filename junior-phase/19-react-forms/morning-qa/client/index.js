import '@tmkelly28/tk-css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

const Puppies = () => (
  <h1>Puppies!</h1>
)

const Foxes = () => (
  <h1>Foxes!</h1>
)

const NotFound = () => (
  <h1>Not all who wander are lost...but you are</h1>
)

ReactDOM.render(
  <div className='bg-blue column center-xy fill-xy'>
    <Router>
      <React.Fragment>
        <div>
          <Link to='/puppies'>Goto Pups</Link>
          <Link to='/foxes'>Goto Foxes</Link>
        </div>
        <div>
          <Switch>
            <Route path='/puppies' component={Puppies} />
            <Route path='/foxes' component={Foxes} />
            <Route exact path='/' component={Foxes} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  </div>,
  document.getElementById('app')
)
