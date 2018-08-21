import React, {Component} from 'react'
import axios from 'axios'

export default class Load extends Component {
  constructor (props) {
    super(props)
    this.state = {
      [this.props.endpoint]: [],
      loaded: false
    }
  }

  async componentDidMount () {
    const {endpoint} = this.props
    const res = await axios.get(`/api/${endpoint}`)
    this.setState({
      [endpoint]: res.data,
      loaded: true
    })
  }

  render () {
    return this.state.loaded ? this.props.render(this.state) : <div>Loading...</div>
  }
}
