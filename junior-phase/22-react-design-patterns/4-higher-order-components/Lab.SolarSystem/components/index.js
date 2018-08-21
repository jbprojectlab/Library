import './index.css'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

const getX = (center, angle, radius) => center + Math.cos(angle) * radius
const getY = (center, angle, radius) => center + Math.sin(angle) * radius

const Planet = ({left, top, name}) => {
  return <div id={name} className='planet' style={{left, top}} />
}

const Img = ({left, top}) => {
  return <img src="cody.jpg" style={{left, top}} />
}

const createOrbiter = (Planet) => class extends Component {
  state = {
    angle: 0,
    left: 200,
    top: 200
  }

  componentDidMount () {
    const orbit = () => {
      this.setState({
        left: getX(this.props.centerX, this.state.angle, this.props.radius),
        top: getY(this.props.centerY, this.state.angle, this.props.radius),
        angle: (this.state.angle + 0.02) % 360
      }, () => {
        window.requestAnimationFrame(orbit)
      })
    }
    window.requestAnimationFrame(orbit)
  }

  render () {
    return <Planet {...this.state} {...this.props} />
  }
}

const Orbiter = createOrbiter(Planet)
const Cody = createOrbiter(Img)

const SolarSystem = class extends Component {
  state = {
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
  }

  render () {
    const {centerY, centerX} = this.state
    return (
      <div>
        <Planet left={centerX} top={centerY} name='sun' />
        <Orbiter {...this.state} radius={50} name='mercury' />
        <Orbiter {...this.state} radius={80} name='venus' />
        <Orbiter {...this.state} radius={120} name='earth'/>
        <Orbiter {...this.state} radius={150} name='mars' />
        <Orbiter {...this.state} radius={200} name='jupiter' />
        <Orbiter {...this.state} radius={300} name='saturn' />
        <Orbiter {...this.state} radius={400} name='uranus' />
        <Orbiter {...this.state} radius={500} name='neptune' />
        <Orbiter {...this.state} radius={600} name='pluto' />
        {/* <Cody {...this.state} radius={300} /> */}
      </div>
    )
  }
}

ReactDOM.render(
  <SolarSystem />,
  document.getElementById('app')
)
