import React, { Component } from 'react'
import { connect } from 'react-redux'
import StoryItem from './StoryItem'
import { addStory } from '../../redux/stories'

/* -----------------    COMPONENT     ------------------ */

class StoryList extends Component {
  constructor () {
    super()

    this.state = {
      title: '',
      name: ''
    }

    this.filterStory = this.filterStory.bind(this)
    this.renderStorySearch = this.renderStorySearch.bind(this)
  }

  render () {
    return (
      <div className='container'>
        { this.renderStorySearch() }
        <br />

        <ul className='list-group'>
          { this.props.stories
            .filter(this.filterStory)
            .map(story => <StoryItem story={story} key={story.id} />)
          }
        </ul>
      </div>
    )
  }

  renderStorySearch () {
    return (
      <div className='list-group-item story-item'>
        <ul className='list-inline'>
          <li>
            <input
              type='text'
              placeholder='Story Title'
              className='form-like large-font'
              onChange={evt => this.setState({ title: evt.target.value })}
            />
          </li>
          <li>
            <span>by</span>
          </li>
          <li>
            <input
              className='form-like'
              type='text'
              placeholder='Jean Doe'
              onChange={evt => this.setState({ name: evt.target.value })}
            />
          </li>
        </ul>
        <span className='glyphicon glyphicon-search' />
      </div>
    )
  }

  filterStory (story) {
    // this is necessary as users can be deleted and their stories are orphaned
    const authorName = (story && story.author) ? story.author.name : ''
    const titleMatch = new RegExp(this.state.title, 'i')
    const nameMatch = new RegExp(this.state.name, 'i')

    return titleMatch.test(story.title) && nameMatch.test(authorName)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ stories }) => ({ stories })

const mapDispatch = { addStory }

export default connect(mapState, mapDispatch)(StoryList)
