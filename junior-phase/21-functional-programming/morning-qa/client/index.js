import '@tmkelly28/tk-css'
import './index.css'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class PugForm extends Component {
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    console.log('yay, no refresh!')
  }

  render () {
    return (
      <form>
        <input
          type='text'
          name='pugName'
          onChange={this.handleChange}
        />
        <button type='submit' onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

ReactDOM.render(
  <div className='bg-blue column center-xy fill-xy'>
    <PugForm />
  </div>,
  document.getElementById('app')
)
