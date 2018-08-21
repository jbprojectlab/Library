import React from 'react'
import Form from './Form'

const RadioForm = (props) => {
  const name = props.question.name
  const choices = props.question.choices
  const handleSubmit = props.handleSubmit
  const handleChange = props.handleChange
  const answer = props.answer

  return (
    <form onSubmit={handleSubmit}>
      <label>{name}</label>
      {
        choices.map(choice => (
          <label key={choice.value}>
            <input
              type='radio'
              value={choice.value}
              checked={answer === choice.value}
              name='answer'
              onChange={handleChange}
            />
            {choice.label}
          </label>
        ))
      }
      <button type='submit' disabled={!answer}>Next</button>
    </form>
  )
}

export default Form(RadioForm)
