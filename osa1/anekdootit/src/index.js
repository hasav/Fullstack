import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { summarizers } from 'istanbul-lib-report';

const Button = ( {handleClick, text} ) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>

    )
}

const MostVotes = ( {votes} ) => {
    let topanec = ""
    let sum = votes.reduce((a, b) => a + b, 0)
    if (sum === 0) {
        topanec = "No votes given yet"
    }
    else {
        let i = votes.indexOf(Math.max(...votes))
        topanec = anecdotes[i]
    }
    return (
        <div>
        <h1>
            Anecdote with most votes
        </h1>
        <p>
            {topanec}
        </p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([
      0, 0, 0, 0, 0, 0
  ]
  )
  const handleAnecdoteClick = () => {
      const num = Math.floor(Math.random() * 6)
      console.log(num)
      return (
          setSelected(num)
      )
  }
  const handleVoteClick = () => {
      const copy = [... votes]
      copy[selected] +=1
      return (
          setVotes(copy)
      )
  }
  return (
    <div>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <Button handleClick={handleAnecdoteClick} text='next anecdote' />
        <Button handleClick={handleVoteClick} text='vote' />
        <MostVotes votes={votes}  /> 
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)