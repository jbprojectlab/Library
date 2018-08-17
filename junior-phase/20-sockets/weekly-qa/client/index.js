import '@tmkelly28/tk-css'
import './index.css'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class PugForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      draftOfNewPugName: this.props.initialPugName
    }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render () {
    return (
      <form>
        <input
          type='text'
          name='draftOfNewPugName'
          onChange={this.handleChange}
          value={this.state.draftOfNewPugName}
        />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

class Pug extends Component {
  state = {
    pugName: '',
    loading: true
  }

  componentDidMount () {
    // const res = await axios.get('/api/pugs')
    // const pug = res.data
    // this.setState({pugName: pug.name})
    setTimeout(() => {
      console.log('Cody has entered the building')
      this.setState({
        pugName: 'Cody',
        loading: false
      })
    })
    // console.log('After we call setTimeout')
  }

  render () {
    console.log('current state on Pug: ', this.state)
    return (
      <div>
        <h1>You are working with a pug named: {this.state.pugName}</h1>
        {
          !this.state.loading && <PugForm initialPugName={this.state.pugName} />
        }
      </div>
    )
  }
}

ReactDOM.render(
  <div className='bg-blue column center-xy fill-xy'>
    <Pug />
  </div>,
  document.getElementById('app')
)

// Intial render:
//  constructor
//  render
//  componentDidMount
//
//
// subsequently:
//  this.setState() || rendered by parent
//  render
//
