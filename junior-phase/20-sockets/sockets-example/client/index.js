import '@tmkelly28/tk-css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
// io: function that creates connection

const socket = io()


class Example extends React.Component {
  state = {
    somebodyClicked: false
  }

  componentDidMount () {
    socket.on('aClickHappened', () => {
      this.showClickHappening()
    })
  }

  showClickHappening () {
    this.setState({
      somebodyClicked: true
    })

    setTimeout(() => {
      this.setState({
        somebodyClicked: false
      })
    }, 3000)
  }

  handleClick = () => {
    socket.emit('somebodyClicked', 'Hi')
    this.showClickHappening()
  }

  render () {
    return (
      <div className='bg-green column center-xy fill-xy'>
        <button onClick={this.handleClick}>
          Click to...React (⌐■_■)
        </button>
        {
          this.state.somebodyClicked &&
            <h1>Whoa! Somebody clicked!</h1>
        }
      </div>
    )
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('app')
)
