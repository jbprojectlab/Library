import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Authors extends Component {
  constructor () {
    super()
    this.state = {
      authors: []
    }
  }

  componentDidMount () {
    axios.get('/api/authors')
      .then(res => res.data)
      .then(authors => this.setState({authors}))
      .catch(console.log.bind(console))
  }

  render () {
    return (
      <div>
        {
          this.state.authors.map(author => (
            <Link to={`/authors/${author.id}`} key={author.id}>
              <div className='author row'>
                <img src={author.imageUrl} />
                <p>{author.name}</p>
              </div>
            </Link>
          ))
        }
      </div>
    )
  }
}
