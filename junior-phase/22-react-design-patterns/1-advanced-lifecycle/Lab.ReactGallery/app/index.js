import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

class Picture extends React.Component {
  state = {
    // by default, we display a picture of flowers
    picture: {
      name: 'Flowers',
      imageUrl: 'flowers.jpg',
      faves: 100
    }
  }

  async componentDidMount () {
    const pictureId = this.props.match.params.pictureId;
    const {data} = await axios.get(`/pictures/${pictureId}`);
    this.setState({picture: data});
  }

  async componentDidUpdate (prevProps) {
    const latest = this.props.match.params.pictureId;
    const prev = prevProps.match.params.pictureId;
    if (latest !== prev) {
      const {data} = await axios.get(`/pictures/${latest}`);
      this.setState({picture: data});
    }
  }

  render () {
    // Remember, this comes from the Route! We want to do math with it,
    // so we coerce it to a number (because it's a string originally)
    const pictureId = Number(this.props.match.params.pictureId)

    // Calculates which picture to show next, or the previous one
    const next = ((pictureId) % 5) + 1
    const prev = (pictureId <= 1) ? 5 : (pictureId - 1)

    const {imageUrl, name, faves} = this.state.picture

    return (
      <div id='gallery-item' className='fill'>
        <div id='image-wrapper'>
          <img src={imageUrl} />
        </div>
        <div id='image-details'>
          <Link to={`/gallery/${prev}`}>Prev</Link>
          <p>{name}</p>
          <div>
            <div className='small gray'>Faves: </div>
            <div>{faves}</div>
          </div>
          <Link to={`/gallery/${next}`}>Next</Link>
        </div>
      </div>
    )
  }
}

// Our goal is to fetch the appopriate picture from our API based on the
// pictureId in the url.
// If anyone navigates to an unknown url, they will be redirected to the first
// picture with the id of 1
const Main = () => (
  <div className='fill'>
    <Switch>
      <Route path='/gallery/:pictureId' component={Picture} />
      <Redirect to={'/gallery/1'} />
    </Switch>
  </div>
)

ReactDOM.render(
  <HashRouter>
    <Main />
  </HashRouter>,
  document.getElementById('app')
)
