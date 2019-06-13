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
      <table>
        <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={all} />
        <Statistic text='average' value={(good - bad)/all} />
        <Statistic text='positive' value={100*(good)/all} />
        </tbody>
      </table>
    )
}

const Statistic = ( {text, value} ) => {
  return (
    <tr>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
    </tr>
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