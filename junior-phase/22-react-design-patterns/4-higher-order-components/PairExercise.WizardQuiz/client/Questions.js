import React, {Component} from 'react'
import SelectForm from './SelectForm'
import RadioForm from './RadioForm'
import Result from './Result'
import sortHouse from './sortHouse'

export default class Questions extends Component {
  constructor () {
    super()
    this.state = {
      currentQuestion: 0,
      answers: []
    }
    this.answerQuestion = this.answerQuestion.bind(this)
  }

  answerQuestion (answer) {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      answers: [...this.state.answers, answer]
    })
  }

  render () {
    const questions = this.props.questions
    const answers = this.state.answers
    const question = questions[this.state.currentQuestion]

    if (answers.length === questions.length) {
      return <Result house={sortHouse(this.state.answers)} />
    } else {
      return this.state.currentQuestion % 2 === 0
        ? <SelectForm question={question} answerQuestion={this.answerQuestion} />
        : <RadioForm question={question} answerQuestion={this.answerQuestion} />
    }
  }
}
