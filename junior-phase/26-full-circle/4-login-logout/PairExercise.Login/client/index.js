import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom'
import store, {fetchMe} from './store'
import Login from './login'
import UserPage from './user-page'

// We've taken a class component and wrapped it in
// `withRouter` so that it receives `history` from react-router-dom
// as a prop! We've kept it a class component because (as we'll see
// in the workshop), we want to take advantage of that `componentDidMount`
// lifecycle hook!
const Main = class extends Component {
  componentDidMount () {
    this.props.fetchMe()
  }

  render () {
    if (this.props.userCurrentlyBeingFetched) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <Switch>
        <Route path='/home' component={UserPage} />
        <Route component={Login} />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  userCurrentlyBeingFetched: state.user.isFetching
})

const mapDispatchToProps = dispatch => ({
  fetchMe: () => dispatch(fetchMe())
})

const WrappedMain = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <WrappedMain />
    </Router>
  </Provider>,
  document.getElementById('app')
)
