import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.text}</h1>
    )
}

const Button = ({ handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Display = ( {text, value}) => {
    return (
        <div>
            {text} {value}
        </div>

    )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  if (all < 1) {
    return (
      <div>
        No feedback given
      </div>
    )
  } 
    return (
      <div>
        <Display text='good' value={good} />
        <Display text='neutral' value={neutral} />
        <Display text='bad' value={bad} />
        <Display text='all' value={all} />
        <Display text='average' value={(good - bad)/all} />
        <Display text='positive' value={100*(good)/all} />
      </div>
    )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={() => setGood(good +1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral +1)} text='neutral'/>
      <Button handleClick={() => setBad(bad +1)} text='bad'/>
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)