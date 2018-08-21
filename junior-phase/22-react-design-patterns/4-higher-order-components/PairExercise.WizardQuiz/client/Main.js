import React from 'react'
import Load from './Load'
import Questions from './Questions'

const Main = () => (
  <Load
    endpoint='questions'
    render={({questions}) => <Questions questions={questions} />}
  />
)

export default Main
